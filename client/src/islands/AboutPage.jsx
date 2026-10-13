import { PageContext } from "../components/PageContext";
import About from "../site-pages/About";
export default function AboutPage({ media }) { return <PageContext pathname="/about" media={media}><About /></PageContext>; }
