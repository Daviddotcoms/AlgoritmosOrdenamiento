import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./styles.css";
import App from "./App";
import { tema } from "./tema";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={tema} forceColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
);
