import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import App from "@/App";
import "./index.css";
createRoot(document.getElementById("root")).render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
