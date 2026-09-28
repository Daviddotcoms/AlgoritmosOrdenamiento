import type { Algoritmo, Paso } from "../tipos";

// Mismo código que la presentación y la guía de estudio (codigo/algoritmos.ts).
const codigo = `function insertionSort(arr: number[]): number[] {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const carta = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > carta) {
      a[j + 1] = a[j]; // correr a la derecha
      j--;
    }
    a[j + 1] = carta;
  }
  return a;
}`;

function* pasos(a: number[]): Generator<Paso, void, undefined> {
  const n = a.length;
  yield { linea: 2, mensaje: "Hago una copia de la lista para no cambiar la original" };
  for (let i = 1; i < n; i++) {
    const carta = a[i];
    yield { linea: 4, carta, hueco: i, pivote: i, rango: [0, i], mensaje: `Tomo la carta ${carta}` };
    let j = i - 1;
    while (j >= 0) {
      const esMayor = a[j] > carta;
      yield {
        linea: 6,
        carta,
        hueco: j + 1,
        comparar: [j, j + 1],
        rango: [0, i],
        mensaje: `¿${a[j]} > ${carta}? ${esMayor ? "Sí, lo corro a la derecha" : "No, la carta va aquí"}`,
      };
      if (!esMayor) break;
      a[j + 1] = a[j];
      yield { linea: 7, carta, hueco: j, escribir: j + 1, rango: [0, i], mensaje: `Corro el ${a[j]} un lugar a la derecha` };
      j--;
    }
    a[j + 1] = carta;
    yield { linea: 10, carta: null, escribir: j + 1, rango: [0, i], mensaje: `Dejo la carta ${carta} en la posición ${j + 1}` };
  }
  yield { linea: 12, mensaje: "Devuelvo la lista ordenada" };
}

export const insertionSort: Algoritmo = {
  id: "insertion",
  nombre: "Insertion Sort",
  idea: "Como ordenar cartas en la mano: toma la siguiente y la mete en su lugar entre las ya ordenadas.",
  velocidad: "Lento · O(n²)",
  codigo,
  pasos,
};
