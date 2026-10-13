import { PageContext } from "../components/PageContext";
import Footer from "../components/Footer";

export default function FooterIsland({ pathname, media }) {
  return <PageContext pathname={pathname} media={media}><Footer /></PageContext>;
}
