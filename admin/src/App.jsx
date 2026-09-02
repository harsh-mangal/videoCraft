import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Camera, Check, ChevronRight, Eye, EyeOff, ImagePlus, Images, LoaderCircle, LogOut, LockKeyhole, RefreshCw, RotateCcw, Search, ShieldCheck, Upload, X } from "lucide-react";
import { request, thumbnail } from "./api";
import { websiteUrl } from "./config";

const siteUrl = websiteUrl();
const Icon = ({ component: Component, ...props }) => <Component size={20} strokeWidth={1.7} aria-hidden="true" focusable="false" {...props} />;
const Brand = () => <div className="brand"><span className="brand-mark"><Icon component={Camera} size={25} /></span><span>Videocrafts<small>STUDIO ADMIN</small></span></div>;

function Login({ onLogin, message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(message);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    try { onLogin(await request("/login", { method: "POST", body: { email, password } })); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="login-page">
    <section className="login-intro"><Brand /><div><span className="eyebrow">YOUR WORK, BEAUTIFULLY PRESENTED</span><h1>A fresh frame.<br />Whenever you need.</h1><p>Manage the photographs that tell your studio’s story. One library, every page.</p></div><span className="login-caption"><Icon component={ShieldCheck} /> Private access for your studio team</span></section>
    <section className="login-panel"><form onSubmit={submit} className="login-form"><span className="login-lock"><Icon component={LockKeyhole} size={24} /></span><h2>Welcome back</h2><p>Sign in to manage your website images.</p>
      <label htmlFor="login-email">Email address</label><input id="login-email" autoComplete="username" type="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} />
      <label htmlFor="login-password">Password</label><div className="password-field"><input id="login-password" type={show ? "text" : "password"} autoComplete="current-password" required maxLength={128} value={password} onChange={event => setPassword(event.target.value)} /><button type="button" className="icon-button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(value => !value)}><Icon component={show ? EyeOff : Eye} /></button></div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="button primary full" disabled={busy}>{busy ? <Icon component={LoaderCircle} className="spin" /> : <Icon component={ArrowUpRight} />}{busy ? "Signing in…" : "Sign in"}</button>
      <p className="setup-note">First time? Create your private account in a terminal:<code>npm --prefix server run admin:create</code>No default password is enabled.</p>
      <a href={siteUrl} className="text-link"><Icon component={ArrowLeft} size={16} /> Back to website</a>
    </form></section>
  </main>;
}

function Editor({ item, session, onClose, onSaved, onExpired }) {
  const dialog = useRef(null), input = useRef(null);
  const [file, setFile] = useState(null), [preview, setPreview] = useState("");
  const [alt, setAlt] = useState(item.value?.alt || "");
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [restore, setRestore] = useState(false);
  useEffect(() => { const node = dialog.current; node.showModal(); return () => node.close(); }, []);
  useEffect(() => { if (!file) { setPreview(""); return; } const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  const dirty = file || alt !== (item.value?.alt || "");
  function close() { if (!busy && (!dirty || window.confirm("Discard your unpublished changes?"))) onClose(); }
  function choose(next) {
    setRestore(false); setError("");
    if (!next) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(next.type) || next.size > 12 * 1024 * 1024) { setError("Choose one JPEG, PNG or WebP image, up to 12 MB."); return; }
    setFile(next);
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      let body = { alt }, method = "PATCH", path = "/images/" + item.id;
      if (restore) { method = "POST"; path += "/restore"; body = {}; }
      else if (file) { method = "PUT"; body = new FormData(); body.append("image", file); body.append("alt", alt); }
      const result = await request(path, { method, body, csrf: session.csrf, version: item.version });
      onSaved(result.image, restore ? "Original restored." : "Image changes published.");
    } catch (err) { if (err.status === 401) onExpired(); else setError(err.message); }
    finally { setBusy(false); }
  }
  const current = item.value?.src || item.src;
  return <dialog ref={dialog} className="editor" aria-labelledby="editor-title" onCancel={event => { event.preventDefault(); close(); }}>
    <form onSubmit={save}>
      <header className="editor-header"><div><span className="eyebrow">EDIT IMAGE</span><h2 id="editor-title">{item.label}</h2></div><button type="button" className="icon-button" onClick={close} disabled={busy} aria-label="Close image editor"><Icon component={X} /></button></header>
      <div className="editor-body"><div className="editor-preview"><img src={restore ? thumbnail(item.src, 960) : preview || thumbnail(current, 960)} alt={restore ? "Original image preview" : preview ? "Selected replacement preview" : "Current image preview"} /><span className="preview-tag">{restore ? "Original" : file ? "Unpublished preview" : "On your website"}</span></div>
        <div className="editor-settings"><span className="eyebrow">APPEARS IN</span><div className="tags">{item.groups.map(group => <span key={group}>{group}</span>)}</div><p className="muted small">{item.usedIn.join(" · ")}. A shared image changes everywhere it appears.</p>
          <button type="button" className="upload-zone" onClick={() => input.current.click()} disabled={busy}><Icon component={Upload} size={26} /><strong>{file ? file.name : "Choose a replacement"}</strong><span>JPEG, PNG or WebP · up to 12 MB</span></button><input ref={input} className="sr-only" tabIndex={-1} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Replacement image" disabled={busy} onChange={event => choose(event.target.files?.[0])} />
          {file && <button type="button" className="text-link" onClick={() => { setFile(null); input.current.value = ""; }} disabled={busy}>Remove selection</button>}
          <label htmlFor="image-alt">Image description <span className="muted">(alt text)</span></label><textarea id="image-alt" rows={3} maxLength={300} value={alt} onChange={event => setAlt(event.target.value)} disabled={busy || restore} placeholder="Describe what the photograph shows" /><p className="muted small">Leave blank to keep the website’s existing description. Decorative backgrounds stay hidden from screen readers.</p>
          <div className="image-specs"><span>Current dimensions</span><strong>{item.value?.width || item.width} × {item.value?.height || item.height}</strong></div>
          {item.value && <button type="button" className="text-link restore-link" disabled={busy} onClick={() => { setRestore(value => !value); setError(""); }}><Icon component={RotateCcw} size={16} />{restore ? "Cancel restore" : "Restore original image"}</button>}
          {restore && <p className="notice">Publishing will restore the original image and its default description.</p>}
        </div></div>
      <footer className="editor-footer">{error && <p className="error" role="alert">{error}</p>}<span className="muted small">Updates are saved on your server.</span><div><button type="button" className="button" disabled={busy} onClick={close}>Cancel</button><button className="button primary" disabled={busy || (!dirty && !restore)}>{busy ? <Icon component={LoaderCircle} className="spin" /> : <Icon component={Check} />}{busy ? "Publishing…" : restore ? "Publish original" : "Publish changes"}</button></div></footer>
    </form>
  </dialog>;
}

function Library({ session, onLogout }) {
  const [items, setItems] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState("");
  const [query, setQuery] = useState(""), [group, setGroup] = useState("All images"), [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null), [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const data = await request("/images"); setItems(data.images); }
    catch (err) { if (err.status === 401) onLogout("Your session expired. Please sign in again."); else setError(err.message); }
    finally { setLoading(false); }
  }, [onLogout]);
  useEffect(() => { load(); }, [load]);
  const groups = useMemo(() => ["All images", ...new Set(items.flatMap(item => item.groups))], [items]);
  const filtered = items.filter(item => (group === "All images" || item.groups.includes(group)) && (filter === "all" || !!item.value) && [item.label, item.id, ...item.groups, ...item.usedIn].join(" ").toLowerCase().includes(query.toLowerCase()));
  async function logout() {
    try { await request("/logout", { method: "POST", csrf: session.csrf }); onLogout(); }
    catch (err) { if (err.status === 401) onLogout(); else setError(err.message); }
  }
  return <div className="dashboard">
    <aside className="sidebar"><Brand /><p className="sidebar-label">WORKSPACE</p><button className="sidebar-active" type="button" onClick={() => { setGroup("All images"); setFilter("all"); setQuery(""); }}><Icon component={Images} /> Image library <ChevronRight size={16} aria-hidden="true" /></button><p className="sidebar-label">COLLECTIONS</p><nav aria-label="Image collections">{groups.map(name => <button type="button" key={name} aria-current={group === name ? "page" : undefined} className={group === name ? "selected" : ""} onClick={() => setGroup(name)}>{name}<span>{name === "All images" ? items.length : items.filter(item => item.groups.includes(name)).length}</span></button>)}</nav><div className="sidebar-note"><Icon component={ShieldCheck} /><p>Your images, your control.<br /><span>Originals are always available to restore.</span></p></div></aside>
    <div className="workspace"><header className="topbar"><span className="breadcrumb">Studio <ChevronRight size={14} aria-hidden="true" /> Image library</span><div><a href={siteUrl} target="_blank" rel="noopener noreferrer" className="button compact">View website <Icon component={ArrowUpRight} size={16} /></a><button className="icon-button" aria-label="Sign out" onClick={logout}><Icon component={LogOut} /></button></div></header>
      <main className="library"><div className="page-title"><div><span className="eyebrow">MAKE EVERY FRAME COUNT</span><h1>Image library<span>.</span></h1><p>Keep your website as fresh as your latest work.</p></div><button className="button" onClick={load} disabled={loading}><Icon component={RefreshCw} className={loading ? "spin" : ""} size={17} />Refresh</button></div>
        <div className="stats"><div><span className="stat-icon"><Icon component={Images} /></span><p><strong>{items.length || "—"}</strong><span>Editable images</span></p></div><div><span className="stat-icon"><Icon component={ImagePlus} /></span><p><strong>{items.filter(item => item.value).length}</strong><span>Updated images</span></p></div><div className="session-info"><span className="status-dot" /><p><strong>Private admin session</strong><span>{session.email}</span></p></div></div>
        <div className="toolbar"><div className="search"><Icon component={Search} size={18} /><label className="sr-only" htmlFor="image-search">Search images</label><input id="image-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by image, page or collection…" /></div><label className="sr-only" htmlFor="collection-filter">Collection</label><select id="collection-filter" value={group} onChange={event => setGroup(event.target.value)}>{groups.map(name => <option key={name}>{name}</option>)}</select><label className="sr-only" htmlFor="status-filter">Image status</label><select id="status-filter" value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All statuses</option><option value="updated">Updated only</option></select></div>
        {notice && <div className="success" role="status"><Icon component={Check} size={18} />{notice}<button className="icon-button" aria-label="Dismiss notification" onClick={() => setNotice("")}><Icon component={X} size={16} /></button></div>}
        {error && <p className="error" role="alert">{error}</p>}
        <div className="results-heading"><h2>{group}</h2><span>{filtered.length} {filtered.length === 1 ? "image" : "images"}</span></div>
        {loading ? <div className="empty" role="status"><Icon component={LoaderCircle} className="spin" size={28} /><p>Loading your image library…</p></div> : filtered.length ? <div className="image-grid">{filtered.map(item => <button type="button" className="image-card" key={item.id} aria-label={"Edit " + item.label} onClick={() => setEditing(item)}><div className="card-preview"><img loading="lazy" decoding="async" src={thumbnail(item.value?.src || item.src)} alt="" className={item.groups.includes("Branding") || item.groups.includes("Reviews") ? "contain" : ""} />{item.value && <span className="updated-badge"><Check size={11} aria-hidden="true" />Updated</span>}<span className="edit-badge"><Icon component={ImagePlus} size={17} /></span></div><div className="card-details"><span>{item.groups[0]}</span><h3>{item.label}</h3><p>{item.value?.width || item.width} × {item.value?.height || item.height}<span>Edit image <ArrowUpRight size={13} aria-hidden="true" /></span></p></div></button>)}</div> : <div className="empty"><Icon component={Search} size={32} /><h3>No images found</h3><p>Try another search or collection.</p><button className="button" onClick={() => { setQuery(""); setGroup("All images"); setFilter("all"); }}>Clear filters</button></div>}
        <p className="library-footnote">Changes update the public website, including shared images and social previews. SVG interface icons are managed in code.</p>
      </main>
    </div>
    {editing && <Editor key={editing.id + ":" + editing.version} item={editing} session={session} onClose={() => setEditing(null)} onExpired={() => onLogout("Your session expired. Please sign in again.")} onSaved={(item, message) => { setItems(current => current.map(existing => existing.id === item.id ? item : existing)); setEditing(null); setNotice(message); }} />}
  </div>;
}

export default function App() {
  const [session, setSession] = useState(null), [checking, setChecking] = useState(true), [message, setMessage] = useState("");
  useEffect(() => { let active = true; request("/session").then(value => { if (active) setSession(value); }).catch(err => { if (active && err.status !== 401) setMessage(err.message); }).finally(() => { if (active) setChecking(false); }); return () => { active = false; }; }, []);
  const logout = useCallback(message => { setSession(null); setMessage(message || ""); }, []);
  if (checking) return <main className="boot" role="status"><Icon component={LoaderCircle} className="spin" size={28} />Connecting to your studio…</main>;
  return session ? <Library session={session} onLogout={logout} /> : <Login onLogin={setSession} message={message} />;
}
