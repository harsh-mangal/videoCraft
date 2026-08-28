import "./App.css";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { MediaProvider } from "./components/MediaProvider";

function App({ initialMedia }) {
  return (
    <BrowserRouter>
      <MediaProvider initialMedia={initialMedia}><Layout /></MediaProvider>
    </BrowserRouter>
  );
}

export default App;
