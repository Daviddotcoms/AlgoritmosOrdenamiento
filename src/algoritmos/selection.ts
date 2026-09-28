import type { Algoritmo, Paso } from "../tipos";

// Mismo código que la guía de estudio (codigo/algoritmos.ts).
const codigo = `function selectionSort(arr: number[]): number[] {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) min = j;
    }
    [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
}`;

function* pasos(a: number[]): Generator<Paso, void, undefined> {
  const n = a.length;
  yield { linea: 2, mensaje: "Hago una copia de la lista para no cambiar la original" };
  for (let i = 0; i < n; i++) {
    let min = i;
    yield { linea: 4, pivote: min, mensaje: `Busco el menor desde la posición ${i}. Por ahora es el ${a[min]}` };
    for (let j = i + 1; j < n; j++) {
      const esMenor = a[j] < a[min];
      yield {
        linea: 6,
        comparar: [j, min],
        pivote: min,
        mensaje: `¿${a[j]} < ${a[min]}? ${esMenor ? `Sí, el nuevo menor es ${a[j]}` : "No"}`,
      };
      if (esMenor) min = j;
    }
    [a[i], a[min]] = [a[min], a[i]];
    yield {
      linea: 8,
      cambiar: min !== i ? [i, min] : undefined,
      fijos: [i],
      mensaje: min !== i ? `Pongo el ${a[i]} en la posición ${i}` : `El ${a[i]} ya estaba en su lugar`,
    };
  }
  yield { linea: 10, mensaje: "Devuelvo la lista ordenada" };
}

export const selectionSort: Algoritmo = {
  id: "selection",
  nombre: "Selection Sort",
  idea: "Busca el más pequeño y lo pone primero. Luego repite con el resto.",
  velocidad: "Lento · O(n²)",
  codigo,
  pasos,
};
