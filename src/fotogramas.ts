import type { Algoritmo, Paso } from "./tipos";

// Un fotograma es el estado completo en un instante: así podemos ir hacia
// adelante, hacia atrás o saltar a cualquier punto de la ejecución.
export interface Fotograma {
  /** Lo que se dibuja: siempre las mismas columnas, solo que reordenadas. */
  vista: number[];
  /** Identidad de cada columna: permite animar que una columna "viaja" a otra posición. */
  ids: number[];
  paso: Paso | null;
  fijos: number[];
  comparaciones: number;
  movimientos: number;
  terminado: boolean;
}

function vistaDe(lista: number[], paso: Paso | null): number[] {
  if (paso?.vista) return [...paso.vista];
  const v = [...lista];
  if (paso?.hueco !== undefined && paso.carta != null) v[paso.hueco] = paso.carta;
  return v;
}

/**
 * Da a cada columna de `nueva` la identidad que tenía en `anterior`, emparejando valores iguales
 * en orden (así un intercambio se ve como dos columnas que cambian de lugar).
 */
export function asignarIds(anterior: number[], idsAnteriores: number[], nueva: number[]): number[] {
  const disponibles = new Map<number, number[]>();
  anterior.forEach((valor, i) => {
    const cola = disponibles.get(valor) ?? [];
    cola.push(idsAnteriores[i]);
    disponibles.set(valor, cola);
  });
  let siguiente = Math.max(-1, ...idsAnteriores) + 1;
  return nueva.map((valor) => disponibles.get(valor)?.shift() ?? siguiente++);
}

export function calcularFotogramas(algoritmo: Algoritmo, datos: number[]): Fotograma[] {
  const lista = [...datos];
  const fijos = new Set<number>();
  let comparaciones = 0;
  let movimientos = 0;
  let vista = [...lista];
  let ids = lista.map((_, i) => i);

  const fotogramas: Fotograma[] = [
    { vista, ids, paso: null, fijos: [], comparaciones, movimientos, terminado: false },
  ];

  for (const paso of algoritmo.pasos(lista)) {
    if (paso.comparar || paso.comparo) comparaciones++;
    if (paso.cambiar || paso.escribir !== undefined || paso.mueve) movimientos++;
    paso.fijos?.forEach((i) => fijos.add(i));
    const nuevaVista = vistaDe(lista, paso);
    ids = asignarIds(vista, ids, nuevaVista);
    vista = nuevaVista;
    fotogramas.push({ vista, ids, paso, fijos: [...fijos], comparaciones, movimientos, terminado: false });
  }

  ids = asignarIds(vista, ids, lista);
  fotogramas.push({
    vista: [...lista],
    ids,
    paso: null,
    fijos: lista.map((_, i) => i),
    comparaciones,
    movimientos,
    terminado: true,
  });
  return fotogramas;
}
