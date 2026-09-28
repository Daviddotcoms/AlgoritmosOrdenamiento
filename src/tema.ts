import { createTheme, type MantineColorsTuple } from "@mantine/core";

// Paleta de la presentación «¿Cómo ordena una computadora?».
export const PALETA = {
  navy: "#1B2140",
  crema: "#FBF7EF",
  tarjeta: "#FFFDF8",
  borde: "#E6DCCB",
  arena: "#F3ECDF",
  suave: "#4A4E69",
  naranjo: "#F28C28",
  naranjoTexto: "#B85C00",
  naranjoClaro: "#FCE3CC",
  azul: "#3A7BD5",
  azulTexto: "#2B5FAE",
  azulClaro: "#DCE7F8",
  barra: "#9DBBE8",
  turquesa: "#1A95A5",
  violeta: "#7B5BD6",
} as const;

const navy: MantineColorsTuple = [
  "#eef0f7",
  "#d9ddec",
  "#b3badb",
  "#8a94c7",
  "#6873b4",
  "#4f5aa1",
  "#3b4485",
  "#2c3467",
  "#1b2140",
  "#12162c",
];

const naranja: MantineColorsTuple = [
  "#fff3e6",
  "#ffe3c7",
  "#fcc890",
  "#f9ab57",
  "#f5952f",
  "#f28c28",
  "#d97a1c",
  "#b85c00",
  "#8f4700",
  "#663200",
];

export const tema = createTheme({
  primaryColor: "navy",
  primaryShade: 8,
  colors: { navy, naranja },
  black: PALETA.navy,
  fontFamily: "Nunito, Verdana, sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', Consolas, monospace",
  headings: { fontFamily: "Fredoka, Verdana, sans-serif", fontWeight: "600" },
  defaultRadius: "md",
  cursorType: "pointer",
  // Escala 0.96 al presionar (ver styles.css).
  activeClassName: "presionable",
  components: {
    Slider: { defaultProps: { color: "naranja.5" } },
    Tooltip: { defaultProps: { color: "navy" } },
  },
});
