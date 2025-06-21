import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import App from "@/App";
import "./index.css";
import { RedirectProvider } from "./context/RedirectContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RedirectProvider>
      <Header />
      <App />
      <Footer />
    </RedirectProvider>
  </BrowserRouter>
);
