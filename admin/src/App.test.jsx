import React from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { request, ApiError } from "./api";
import { ADMIN_URL, API_URL, PUBLIC_SITE_URL, apiUrl, mediaUrl, websiteUrl } from "./config";

vi.mock("./api", async original => ({ ...await original(), request: vi.fn() }));
const session = { email: "admin@example.test", csrf: "test-token" };
const photo = { id: "hero", label: "Home hero", src: "/original.png", width: 1000, height: 700, groups: ["Home"], usedIn: ["Banner"], version: 0, value: null };
beforeEach(() => { vi.mocked(request).mockReset(); URL.createObjectURL = vi.fn(() => "blob:preview"); URL.revokeObjectURL = vi.fn(); });
afterEach(cleanup);
function signedIn(items = [photo]) { vi.mocked(request).mockImplementation(async path => path === "/session" ? session : { images: items }); }

test("uses the production website, admin and API subdomains while keeping local requests relative", () => {
  const production = { hostname: "admin.videocraftsindia.com" };
  const local = { hostname: "127.0.0.1" };
  expect(PUBLIC_SITE_URL).toBe("https://www.videocraftsindia.com/");
  expect(ADMIN_URL).toBe("https://admin.videocraftsindia.com/");
  expect(API_URL).toBe("https://api.videocraftsindia.com");
  expect(apiUrl("/api/admin/session", production)).toBe(API_URL + "/api/admin/session");
  expect(mediaUrl("/media/photo.webp", production)).toBe(API_URL + "/media/photo.webp");
  expect(websiteUrl(production)).toBe(PUBLIC_SITE_URL);
  expect(apiUrl("/api/admin/session", local)).toBe("/api/admin/session");
  expect(mediaUrl("/media/photo.webp", local)).toBe("/media/photo.webp");
});

test("login does not grant access after an invalid password", async () => {
  const user = userEvent.setup();
  vi.mocked(request).mockRejectedValue(new ApiError("Email or password is incorrect.", 401));
  render(<App />);
  await user.type(await screen.findByLabelText("Email address"), "admin@example.test");
  await user.type(screen.getByLabelText("Password"), "incorrect-password");
  await user.click(screen.getByRole("button", { name: "Sign in" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Email or password is incorrect.");
  expect(screen.queryByRole("heading", { name: "Image library." })).not.toBeInTheDocument();
});
test("image search and collection filters work together", async () => {
  const user = userEvent.setup(); signedIn([photo, { ...photo, id: "gallery", label: "Wedding portrait", groups: ["Gallery"] }]);
  render(<App />); await screen.findByRole("button", { name: "Edit Home hero" });
  await user.type(screen.getByLabelText("Search images"), "portrait");
  expect(screen.queryByRole("button", { name: "Edit Home hero" })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Edit Wedding portrait" })).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText("Collection", { exact: true }), "Home");
  expect(screen.getByRole("heading", { name: "No images found" })).toBeInTheDocument();
});
test("publishing sends the uploaded file, alt text, CSRF token and original version", async () => {
  const user = userEvent.setup(); signedIn(); render(<App />);
  await user.click(await screen.findByRole("button", { name: "Edit Home hero" }));
  await user.upload(screen.getByLabelText("Replacement image"), new File(["image"], "portrait.png", { type: "image/png" }));
  await user.type(screen.getByLabelText(/Image description/), "A wedding portrait");
  vi.mocked(request).mockResolvedValueOnce({ image: { ...photo, version: 1, value: { src: "/media/new.webp", alt: "A wedding portrait" } } });
  await user.click(screen.getByRole("button", { name: "Publish changes" }));
  expect(await screen.findByRole("status")).toHaveTextContent("Image changes published.");
  const [path, options] = vi.mocked(request).mock.calls.at(-1);
  expect(path).toBe("/images/hero"); expect(options.method).toBe("PUT"); expect(options.csrf).toBe("test-token"); expect(options.version).toBe(0);
  expect(options.body.get("image").name).toBe("portrait.png"); expect(options.body.get("alt")).toBe("A wedding portrait");
});
test("conflicting edits stay open with an error instead of displaying success", async () => {
  const user = userEvent.setup(); signedIn(); render(<App />);
  await user.click(await screen.findByRole("button", { name: "Edit Home hero" }));
  await user.type(screen.getByLabelText(/Image description/), "New description");
  vi.mocked(request).mockRejectedValueOnce(new ApiError("This image has changed. Refresh before saving.", 409));
  await user.click(screen.getByRole("button", { name: "Publish changes" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Refresh before saving");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
test("restoring the original requires a separate publish action", async () => {
  const user = userEvent.setup(); signedIn([{ ...photo, version: 2, value: { src: "/media/new.webp" } }]); render(<App />);
  await user.click(await screen.findByRole("button", { name: "Edit Home hero" }));
  await user.click(screen.getByRole("button", { name: "Restore original image" }));
  expect(within(screen.getByRole("dialog")).getByRole("img", { name: "Original image preview" })).toHaveAttribute("src", "/original.png");
  expect(vi.mocked(request).mock.calls.some(([path]) => path.includes("restore"))).toBe(false);
  vi.mocked(request).mockResolvedValueOnce({ image: { ...photo, version: 3 } });
  await user.click(screen.getByRole("button", { name: "Publish original" }));
  expect(vi.mocked(request)).toHaveBeenLastCalledWith("/images/hero/restore", expect.objectContaining({ method: "POST", version: 2, csrf: "test-token" }));
  expect(await screen.findByRole("status")).toHaveTextContent("Original restored.");
});
