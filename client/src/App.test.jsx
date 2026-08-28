import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, useLocation } from "react-router-dom";
import { buildWhatsAppUrl, openWhatsApp, WHATSAPP_NUMBER } from "./utils/whatsapp";
import { normalizePhone, validateEnquiry } from "./utils/enquiry";
import { getPageMeta, normalizePath, SITE_URL } from "./config/seo";
import { imageUrl, imageSrcSet, resolveImage } from "./utils/images";
import { MediaProvider } from "./components/MediaProvider";
import ResponsiveImage from "./components/ResponsiveImage";
import SocialLinks from "./components/SocialLinks";
import ContactForm from "./pages/ContactForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageMeta from "./components/PageMeta";
import Carousel from "./components/Carousel";
import Layout from "./Layout";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import ReviewsSection from "./pages/ReviewsSection";
import WhatsAppButton from "./components/WhatsAppButton";

vi.mock("./utils/whatsapp", async importOriginal => ({
  ...await importOriginal(),
  openWhatsApp: vi.fn(),
}));

beforeEach(() => { vi.mocked(openWhatsApp).mockClear(); vi.stubGlobal("scrollTo", vi.fn()); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); document.head.innerHTML = ""; });

test("encodes a trimmed enquiry safely for the configured WhatsApp number", () => {
  const url = new URL(buildWhatsAppUrl("  Hello & welcome\nभारत  "));
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/" + WHATSAPP_NUMBER);
  expect(url.searchParams.get("text")).toBe("Hello & welcome\nभारत");
});

test("floating WhatsApp action opens an enquiry for the studio in a separate tab", () => {
  render(<WhatsAppButton />);
  const link = screen.getByRole("link", { name: "Chat on WhatsApp (opens in a new tab)" });
  const url = new URL(link.href);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/" + WHATSAPP_NUMBER);
  expect(url.searchParams.get("text")).toContain("photography services");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

describe("phone validation", () => {
  test.each(["abc1234567890", "123", "1234567890123456", "+0123456789", "9876543210++", "91 9876543210", "0000000000", "", "12345(67890", "-9876543210", "98765--43210"])("rejects malformed input %s", input => {
    expect(normalizePhone(input)).toBeNull();
  });
  test.each([
    ["98765 43210", "9876543210"],
    ["+91 (98765) 43210", "+919876543210"],
    ["+1-202-555-0123", "+12025550123"],
  ])("normalizes supported format %s", (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });
});

test("requires service and rejects malformed optional email", () => {
  const form = { name: "Test", phone: "9876543210", service: "", email: "" };
  expect(validateEnquiry(form).field).toBe("service");
  expect(validateEnquiry({ ...form, service: "Other", email: "a@@example.com" }).field).toBe("email");
});

test("invalid enquiries focus the field, announce the error and never leave the site", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.click(screen.getByRole("button", { name: "Continue on WhatsApp" }));
  expect(screen.getByLabelText("Name *")).toHaveFocus();
  expect(screen.getByRole("alert")).toHaveTextContent("Please enter your name.");
  await user.type(screen.getByLabelText("Name *"), "Example Visitor");
  await user.type(screen.getByLabelText("Phone *"), "abcdefgh1234567890");
  await user.click(screen.getByRole("button", { name: "Continue on WhatsApp" }));
  expect(screen.getByLabelText("Phone *")).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByLabelText("Phone *")).toHaveFocus();
  expect(openWhatsApp).not.toHaveBeenCalled();
});

test("valid enquiry includes all fields and normalized contact details", async () => {
  const user = userEvent.setup();
  render(<ContactForm compact />);
  await user.type(screen.getByLabelText("Name *"), " Example Visitor ");
  await user.type(screen.getByLabelText("Phone *"), "+91 98765 43210");
  await user.type(screen.getByLabelText("Email", { exact: true }), "visitor@example.com");
  await user.selectOptions(screen.getByLabelText("Service *"), "Wedding Videography");
  await user.type(screen.getByLabelText("Event date"), "2027-02-15");
  await user.type(screen.getByLabelText("Venue / city"), "Chandigarh");
  await user.type(screen.getByLabelText("Tell us more"), "Please share availability.");
  await user.click(screen.getByRole("button", { name: "Continue on WhatsApp" }));
  expect(openWhatsApp).toHaveBeenCalledOnce();
  const message = vi.mocked(openWhatsApp).mock.calls[0][0];
  for (const detail of ["Name: Example Visitor", "Phone: +919876543210", "visitor@example.com", "Wedding Videography", "2027-02-15", "Chandigarh", "Please share availability."]) expect(message).toContain(detail);
});

test("multiple enquiry forms have distinct label and error IDs", () => {
  const { container } = render(<><ContactForm /><ContactForm compact /></>);
  const ids = [...container.querySelectorAll("[id]")].map(element => element.id);
  expect(new Set(ids).size).toBe(ids.length);
  expect(screen.getAllByLabelText("Name *")).toHaveLength(2);
});

test("footer validates updates requests and composes a WhatsApp message", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><Footer /></MemoryRouter>);
  await user.click(screen.getByRole("button", { name: "Continue on WhatsApp" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.");
  expect(openWhatsApp).not.toHaveBeenCalled();
  await user.type(screen.getByLabelText("Email address"), "visitor@example.com");
  await user.click(screen.getByRole("button", { name: "Continue on WhatsApp" }));
  expect(openWhatsApp).toHaveBeenCalledWith("Hello Videocrafts India, please add visitor@example.com to your updates list.");
});

test("mobile menu closes on Escape and returns focus to its toggle", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  const button = screen.getByRole("button", { name: "Open navigation menu" });
  await user.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  await user.keyboard("{Escape}");
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(button).toHaveFocus();
});

test("mobile route selection closes the menu", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
  await user.click(within(document.getElementById("mobile-navigation")).getByRole("link", { name: "Contact Us" }));
  expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute("aria-expanded", "false");
});

test("manual carousel advances and wraps with accessible buttons", async () => {
  const user = userEvent.setup();
  render(<Carousel label="test photos" items={["First", "Second"]} renderItem={item => <p>{item}</p>} />);
  await user.click(screen.getByRole("button", { name: "Next test photos" }));
  expect(screen.getByText("Second")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Next test photos" }));
  expect(screen.getByText("First")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Previous test photos" }));
  expect(screen.getByText("Second")).toBeInTheDocument();
});

test("review star icons expose one readable rating after changing reviews", async () => {
  const user = userEvent.setup();
  render(<ReviewsSection />);
  expect(screen.getAllByRole("img", { name: "5 out of 5 stars" })).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "Next client reviews" }));
  expect(screen.getByRole("heading", { name: "Geetanjali Sharma" })).toBeInTheDocument();
  expect(screen.getAllByRole("img", { name: "5 out of 5 stars" })).toHaveLength(1);
});

test.each(["/about/", "/About", "/ABOUT///"])("normalizes known route %s", path => {
  expect(getPageMeta(path).canonical).toBe(SITE_URL + "/about");
  expect(getPageMeta(path).title).not.toContain("Not Found");
});

test("preserves legacy URL redirects and handles malformed encodings safely", () => {
  expect(normalizePath("/From-%E2%80%98I-Do%E2%80%99-to%20Forever")).toBe("/wedding-stories/from-i-do-to-forever");
  expect(normalizePath("/bridal-potraits")).toBe("/bridal-portraits");
  expect(getPageMeta("/bad%ZZ").canonical).toBeNull();
});

test("client navigation updates metadata and clears it on a missing page", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={["/about/"]}><PageMeta /><Link to="/missing">Missing page</Link></MemoryRouter>);
  expect(document.title).toBe(getPageMeta("/about").title);
  expect(document.querySelector('link[rel="canonical"]').href).toBe(SITE_URL + "/about");
  expect(document.querySelector('link[rel="icon"]')).toHaveAttribute("href", "/brand-icon.png");
  expect(JSON.parse(document.getElementById("site-schema").textContent)["@graph"]).toBeTruthy();
  await user.click(screen.getByRole("link", { name: "Missing page" }));
  expect(document.title).toContain("Page Not Found");
  expect(document.querySelector('meta[name="robots"]').content).toBe("noindex, follow");
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  expect(document.getElementById("site-schema")).toBeNull();
});

function LocationProbe() { return <output aria-label="Current path">{useLocation().pathname}</output>; }
test("full layout redirects case and trailing-slash aliases to a canonical URL", async () => {
  render(<MemoryRouter initialEntries={["/About/"]}><Layout /><LocationProbe /></MemoryRouter>);
  expect(await screen.findByRole("heading", { name: "About Us", level: 1 })).toBeInTheDocument();
  expect(screen.getByLabelText("Current path")).toHaveTextContent("/about");
});

test("responsive image URLs preserve source parameters and stay within the requested width", () => {
  const src = "https://ik.imagekit.io/example/photo.jpg?updatedAt=123";
  const url = new URL(imageUrl(src, 640));
  expect(url.searchParams.get("updatedAt")).toBe("123");
  expect(url.searchParams.get("tr")).toBe("w-640,q-80,f-auto");
  expect(imageSrcSet(src, 640)).toContain("640w");
  expect(imageSrcSet(src, 640)).not.toContain("960w");
  expect(imageUrl("/brand-icon.png")).toBe("/brand-icon.png");
});

test("a failed route chunk leaves a recovery link instead of a blank page", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const BrokenRoute = () => { throw new Error("Chunk unavailable"); };
  render(<RouteErrorBoundary path="/gallery"><BrokenRoute /></RouteErrorBoundary>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This page could not load");
  expect(screen.getByRole("link", { name: "Reload page" })).toHaveAttribute("href", "/gallery");
});

test("published images use server dimensions and variants while decorative images remain decorative", () => {
  const src = "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/banner.jpg";
  const id = resolveImage(src).id;
  const media = { [id]: { src: "/media/test-640.webp", width: 640, height: 400, alt: "Updated photograph", variants: [{ width: 320, src: "/media/test-320.webp" }, { width: 640, src: "/media/test-640.webp" }] } };
  const { container } = render(<MediaProvider initialMedia={media} live={false}><ResponsiveImage src={src} alt="Original description" /><ResponsiveImage src={src} alt="" /></MediaProvider>);
  const image = screen.getByRole("img", { name: "Updated photograph" });
  expect(image).toHaveAttribute("width", "640"); expect(image).toHaveAttribute("height", "400");
  expect(image).toHaveAttribute("srcset", "/media/test-320.webp 320w, /media/test-640.webp 640w");
  expect(container.querySelectorAll('img[alt=""]')).toHaveLength(1);
  expect(getPageMeta("/", media).image).toBe(SITE_URL + "/media/test-640.webp");
});

test("brand links retain clear accessible names and safe external navigation", () => {
  render(<SocialLinks />);
  for (const name of ["Facebook", "Instagram", "YouTube", "WhatsApp"]) {
    const link = screen.getByRole("link", { name: name + " (opens in a new tab)" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  }
});
