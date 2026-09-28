import type { Algoritmo, Paso } from "../tipos";

// Mismo código que la guía de estudio (codigo/algoritmos.ts).
// Para animarlo, cada mitad se mezcla sobre su tramo de la lista original.
const codigo = `function mergeSort(a: number[]): number[] {
  if (a.length <= 1) return a;
  const mitad = Math.floor(a.length / 2);
  const izq = mergeSort(a.slice(0, mitad));
  const der = mergeSort(a.slice(mitad));
  return mezclar(izq, der);
}

function mezclar(izq: number[], der: number[]): number[] {
  const res: number[] = [];
  let i = 0, j = 0;
  while (i < izq.length && j < der.length) {
    res.push(izq[i] <= der[j] ? izq[i++] : der[j++]);
  }
  return [...res, ...izq.slice(i), ...der.slice(j)];
}`;

function* ordenar(a: number[], ini: number, fin: number): Generator<Paso, void, undefined> {
  if (fin - ini <= 1) return;
  const mitad = Math.floor((ini + fin) / 2);
  const rango: [number, number] = [ini, fin - 1];
  yield { linea: 3, rango, mensaje: `Divido [${a.slice(ini, fin).join(", ")}] en dos mitades` };
  yield { linea: 4, rango: [ini, mitad - 1], mensaje: `Ordeno la mitad izquierda: [${a.slice(ini, mitad).join(", ")}]` };
  yield* ordenar(a, ini, mitad);
  yield { linea: 5, rango: [mitad, fin - 1], mensaje: `Ordeno la mitad derecha: [${a.slice(mitad, fin).join(", ")}]` };
  yield* ordenar(a, mitad, fin);
  yield* mezclar(a, ini, mitad, fin);
}

function* mezclar(a: number[], ini: number, mitad: number, fin: number): Generator<Paso, void, undefined> {
  const izq = a.slice(ini, mitad);
  const der = a.slice(mitad, fin);
  const rango: [number, number] = [ini, fin - 1];
  yield { linea: 10, rango, mensaje: `Mezclo [${izq.join(", ")}] con [${der.join(", ")}]` };
  let i = 0, j = 0, k = ini;
  // Lo que se ve: lo ya mezclado (res), luego lo que queda de cada mitad.
  const vista = () => [...a.slice(0, k + 1), ...izq.slice(i), ...der.slice(j), ...a.slice(fin)];
  while (i < izq.length && j < der.length) {
    const x = izq[i], y = der[j];
    a[k] = x <= y ? izq[i++] : der[j++];
    yield { linea: 13, rango, escribir: k, comparo: true, vista: vista(), mensaje: `Comparo ${x} con ${y}: pongo el ${a[k]}` };
    k++;
  }
  const sobra = [...izq.slice(i), ...der.slice(j)];
  for (const valor of sobra) a[k++] = valor;
  yield {
    linea: 15,
    rango,
    mueve: sobra.length > 0,
    mensaje: sobra.length ? `Agrego al final lo que sobró: [${sobra.join(", ")}]` : "No sobró nada: la mezcla está lista",
  };
}

export const mergeSort: Algoritmo = {
  id: "merge",
  nombre: "Merge Sort",
  idea: "Divide la lista en mitades hasta tener listas de 1 y luego las mezcla en orden.",
  velocidad: "Rápido · O(n log n)",
  codigo,
  pasos: (a) => ordenar(a, 0, a.length),
};
