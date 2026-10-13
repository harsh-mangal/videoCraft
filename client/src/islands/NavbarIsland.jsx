import { PageContext } from "../components/PageContext";
import Navbar from "../components/Navbar";

export default function NavbarIsland({ pathname, media }) {
  return <PageContext pathname={pathname} media={media}><Navbar currentPath={pathname} /></PageContext>;
}
