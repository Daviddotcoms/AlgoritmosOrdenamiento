import type { Algoritmo, Paso } from "../tipos";

// Mismo código que la presentación y la guía de estudio (codigo/algoritmos.ts).
const codigo = `function bubbleSort(arr: number[]): number[] {
  const a = [...arr]; // copia
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}`;

function* pasos(a: number[]): Generator<Paso, void, undefined> {
  const n = a.length;
  yield { linea: 2, mensaje: "Hago una copia de la lista para no cambiar la original" };
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const alReves = a[j] > a[j + 1];
      yield {
        linea: 5,
        comparar: [j, j + 1],
        mensaje: `¿${a[j]} > ${a[j + 1]}? ${alReves ? "Sí, están al revés" : "No, están bien"}`,
      };
      if (alReves) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { linea: 6, cambiar: [j, j + 1], mensaje: `Intercambio: ahora ${a[j]} va antes que ${a[j + 1]}` };
      }
    }
    yield { linea: 3, fijos: [n - 1 - i], mensaje: `Fin de la vuelta ${i + 1}: el ${a[n - 1 - i]} ya está en su lugar` };
  }
  yield { linea: 10, fijos: [0], mensaje: "Devuelvo la lista ordenada" };
}

export const bubbleSort: Algoritmo = {
  id: "bubble",
  nombre: "Bubble Sort",
  idea: "Compara vecinos y los intercambia si están al revés. El más grande «sube» al final en cada vuelta.",
  velocidad: "Lento · O(n²)",
  codigo,
  pasos,
};
