import { PageContext } from "../components/PageContext";
import Gallery from "../site-pages/Gallery";
export default function GalleryPage({ media }) { return <PageContext pathname="/gallery" media={media}><Gallery /></PageContext>; }
