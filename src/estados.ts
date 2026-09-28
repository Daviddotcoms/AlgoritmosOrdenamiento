import type { Fotograma } from "./fotogramas";
import { PALETA } from "./tema";

export type Estado = "normal" | "comparar" | "cambiar" | "pivote" | "fijo";
type EstadoColor = Exclude<Estado, "normal">;

// Colores de la presentación. Validados con el script de la skill dataviz (sobre #FFFDF8):
// naranjo / turquesa / violeta -> ALL CHECKS PASS en todas las parejas, visión normal y daltonismo.
// «En su lugar» es el azul marino (estado final, se distingue por luminosidad).
// El contraste bajo del naranjo se compensa con el número sobre cada columna y la leyenda.
export const ESTADOS: Record<EstadoColor, { etiqueta: string; color: string }> = {
  comparar: { etiqueta: "Se comparan", color: PALETA.naranjo },
  cambiar: { etiqueta: "Se mueven", color: PALETA.turquesa },
  pivote: { etiqueta: "Pivote, menor o carta", color: PALETA.violeta },
  fijo: { etiqueta: "En su lugar", color: PALETA.navy },
};

export const ORDEN_LEYENDA: EstadoColor[] = ["comparar", "cambiar", "pivote", "fijo"];

export function colorDe(estado: Estado): string {
  return estado === "normal" ? PALETA.barra : ESTADOS[estado].color;
}

/** Qué estado tiene la columna `i`. Si coinciden varios, gana el más importante. */
export function estadoDe(i: number, f: Fotograma): Estado {
  const p = f.paso;
  if (p?.hueco === i && p.carta != null) return "pivote";
  if (p?.cambiar?.includes(i) || p?.escribir === i) return "cambiar";
  if (p?.pivote === i) return "pivote";
  if (p?.comparar?.includes(i)) return "comparar";
  if (f.fijos.includes(i)) return "fijo";
  return "normal";
}

export function fueraDeRango(i: number, f: Fotograma): boolean {
  const r = f.paso?.rango;
  return r !== undefined && (i < r[0] || i > r[1]);
}

export function etiquetaDe(estado: Estado): string {
  return estado === "normal" ? "Sin cambios" : ESTADOS[estado].etiqueta;
}
