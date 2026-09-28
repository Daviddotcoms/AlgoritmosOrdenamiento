import type { Algoritmo, Paso } from "../tipos";

// Mismo código que la presentación y la guía de estudio (codigo/algoritmos.ts).
const codigo = `function bubbleSort(lista: number[]): number[] {
  for (let vuelta = 1; vuelta < lista.length; vuelta++) {
    for (let i = 0; i < lista.length - 1; i++) {
      if (lista[i] > lista[i + 1]) {
        [lista[i], lista[i + 1]] = [lista[i + 1], lista[i]];
      }
    }
  }
  return lista;
}`;

function* pasos(lista: number[]): Generator<Paso, void, undefined> {
  const n = lista.length;
  for (let vuelta = 1; vuelta < n; vuelta++) {
    for (let i = 0; i < n - 1; i++) {
      const alReves = lista[i] > lista[i + 1];
      yield {
        linea: 4,
        comparar: [i, i + 1],
        mensaje: `¿${lista[i]} > ${lista[i + 1]}? ${alReves ? "Sí, están al revés" : "No, están bien"}`,
      };
      if (alReves) {
        [lista[i], lista[i + 1]] = [lista[i + 1], lista[i]];
        yield { linea: 5, cambiar: [i, i + 1], mensaje: `Intercambio: ahora ${lista[i]} va antes que ${lista[i + 1]}` };
      }
    }
    yield { linea: 2, fijos: [n - vuelta], mensaje: `Fin de la vuelta ${vuelta}: el ${lista[n - vuelta]} ya está en su lugar` };
  }
  yield { linea: 9, fijos: [0], mensaje: "Devuelvo la lista ordenada" };
}

export const bubbleSort: Algoritmo = {
  id: "bubble",
  nombre: "Bubble Sort",
  idea: "Compara vecinos y los intercambia si están al revés. El más grande «sube» al final en cada vuelta.",
  velocidad: "Lento · O(n²)",
  codigo,
  pasos,
};
