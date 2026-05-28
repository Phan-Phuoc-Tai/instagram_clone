import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
const queryClient = new QueryClient();
const renderApp = () =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </StrictMode>,
  );
const initApp = () => {
  const preloadElement = document.querySelector(
    ".preload-container",
  ) as HTMLElement;
  if (preloadElement) {
    preloadElement.style.transition = "opacity 0.4s ease";

    setTimeout(() => {
      renderApp();
    }, 1000);
  } else {
    renderApp();
  }
};

window.addEventListener("load", initApp);
