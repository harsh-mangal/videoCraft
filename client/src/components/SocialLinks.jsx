import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "@icons-pack/react-simple-icons";

const links = [
  { href: "https://www.facebook.com/videocrafts9572", label: "Facebook", Icon: SiFacebook, color: "#1877F2" },
  { href: "https://www.instagram.com/videocrafts/", label: "Instagram", Icon: SiInstagram, color: "#C13584" },
  { href: "https://www.youtube.com/@videocrafts84", label: "YouTube", Icon: SiYoutube, color: "#E62117" },
  { href: "https://wa.me/919888626212", label: "WhatsApp", Icon: SiWhatsapp, color: "#128C7E" },
];

export default function SocialLinks() {
  return <div className="social-links">{links.map(({ href, label, Icon, color }) =>
    <a key={label} href={href} aria-label={label + " (opens in a new tab)"} title={label} target="_blank" rel="noopener noreferrer" className="social-link" style={{ color }}>
      <Icon size={23} aria-hidden="true" focusable="false" title="" />
    </a>
  )}</div>;
}
