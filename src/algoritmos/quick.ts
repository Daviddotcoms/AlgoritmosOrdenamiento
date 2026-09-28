import type { Algoritmo, Paso } from "../tipos";

// Mismo código que la presentación y la guía de estudio (codigo/algoritmos.ts).
// Para animarlo, cada grupo (menores, pivote, mayores) se acomoda sobre su tramo de la lista.
const codigo = `function quickSort(a: number[]): number[] {
  if (a.length <= 1) return a;
  const [pivote, ...resto] = a;
  const menores = resto.filter((x) => x < pivote);
  const mayores = resto.filter((x) => x >= pivote);
  return [
    ...quickSort(menores),
    pivote,
    ...quickSort(mayores),
  ];
}`;

function* ordenar(a: number[], ini: number, fin: number): Generator<Paso, void, undefined> {
  if (fin < ini) return;
  if (fin === ini) {
    yield { linea: 2, fijos: [ini], mensaje: `El ${a[ini]} está solo: ya está ordenado` };
    return;
  }
  const rango: [number, number] = [ini, fin];
  const pivote = a[ini];
  yield { linea: 3, pivote: ini, rango, mensaje: `El pivote es el primero: ${pivote}` };

  // Primera pasada del filter: los menores.
  const menores: number[] = [];
  for (let k = ini + 1; k <= fin; k++) {
    const esMenor = a[k] < pivote;
    if (esMenor) menores.push(a[k]);
    yield {
      linea: 4,
      comparar: [k, ini],
      pivote: ini,
      rango,
      mensaje: `¿${a[k]} < ${pivote}? ${esMenor ? "Sí, va a menores" : "No"}`,
    };
  }
  // Segunda pasada del filter: los mayores (o iguales).
  const mayores: number[] = [];
  for (let k = ini + 1; k <= fin; k++) {
    const esMayor = a[k] >= pivote;
    if (esMayor) mayores.push(a[k]);
    yield {
      linea: 5,
      comparar: [k, ini],
      pivote: ini,
      rango,
      mensaje: `¿${a[k]} ≥ ${pivote}? ${esMayor ? "Sí, va a mayores" : "No"}`,
    };
  }

  // Junto menores, pivote y mayores sobre el mismo tramo.
  const nuevo = [...menores, pivote, ...mayores];
  nuevo.forEach((v, k) => (a[ini + k] = v));
  const p = ini + menores.length;
  yield {
    linea: 8,
    mueve: true,
    pivote: p,
    fijos: [p],
    rango,
    mensaje: `Junto [${menores.join(", ")}], ${pivote} y [${mayores.join(", ")}]: el ${pivote} quedó en su lugar`,
  };

  if (menores.length) yield { linea: 7, rango: [ini, p - 1], mensaje: `Ahora ordeno los menores: [${menores.join(", ")}]` };
  yield* ordenar(a, ini, p - 1);
  if (mayores.length) yield { linea: 9, rango: [p + 1, fin], mensaje: `Ahora ordeno los mayores: [${mayores.join(", ")}]` };
  yield* ordenar(a, p + 1, fin);
}

export const quickSort: Algoritmo = {
  id: "quick",
  nombre: "Quick Sort",
  idea: "Elige un pivote: los menores van a la izquierda y los mayores a la derecha. Repite con cada grupo.",
  velocidad: "Rápido · O(n log n)",
  codigo,
  pasos: (a) => ordenar(a, 0, a.length - 1),
};
