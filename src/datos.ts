export type TipoDatos = "azar" | "casi" | "reves" | "repetidos";

export const TIPOS_DATOS: { value: TipoDatos; label: string }[] = [
  { value: "azar", label: "Al azar" },
  { value: "casi", label: "Casi ordenados" },
  { value: "reves", label: "Al revés" },
  { value: "repetidos", label: "Con repetidos" },
];

const azar = () => 1 + Math.floor(Math.random() * 99);

export function generarDatos(tipo: TipoDatos, n: number): number[] {
  switch (tipo) {
    case "azar":
      return Array.from({ length: n }, azar);
    case "casi": {
      const a = Array.from({ length: n }, azar).sort((x, y) => x - y);
      const cambios = Math.max(1, Math.round(n / 8));
      for (let k = 0; k < cambios; k++) {
        const i = Math.floor(Math.random() * (n - 1));
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
      }
      return a;
    }
    case "reves":
      return Array.from({ length: n }, azar).sort((x, y) => y - x);
    case "repetidos": {
      const valores = [20, 45, 70, 95];
      return Array.from({ length: n }, () => valores[Math.floor(Math.random() * valores.length)]);
    }
  }
}

export function leerDatos(texto: string): number[] | null {
  const numeros = texto.split(/[,;\s]+/).filter(Boolean).map(Number);
  const validos =
    numeros.length >= 2 && numeros.length <= 40 && numeros.every((x) => Number.isInteger(x) && x >= 1 && x <= 99);
  return validos ? numeros : null;
}
