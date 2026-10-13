import { PageContext } from "../components/PageContext";
import Home from "../site-pages/Home";
export default function HomePage({ media }) { return <PageContext pathname="/" media={media}><Home /></PageContext>; }
