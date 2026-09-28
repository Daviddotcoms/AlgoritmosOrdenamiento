// Un "paso" es una foto de lo que está haciendo el algoritmo en un momento.
// El visualizador lo usa para pintar las barras y resaltar la línea de código.
export interface Paso {
  /** Línea del código (empieza en 1) que se está ejecutando. */
  linea: number;
  /** Explicación en palabras de lo que pasa. */
  mensaje: string;
  /** Dos posiciones que se están comparando. */
  comparar?: [number, number];
  /** Dos posiciones que se acaban de intercambiar. */
  cambiar?: [number, number];
  /** Posición donde se acaba de escribir un valor. */
  escribir?: number;
  /** Posición de un elemento especial (pivote, menor encontrado, carta tomada). */
  pivote?: number;
  /** Zona de la lista en la que se está trabajando [desde, hasta]. */
  rango?: [number, number];
  /** Posiciones que ya quedaron en su lugar definitivo. */
  fijos?: number[];
  /** Valor que Insertion Sort tiene "en la mano" (null = ya lo soltó). */
  carta?: number | null;
  /** true si en este paso hubo una comparación que no se ve en `comparar`. */
  comparo?: boolean;
  /** true si en este paso se reacomodaron columnas (Quick Sort al juntar grupos, Merge Sort al agregar lo que sobró). */
  mueve?: boolean;
  /** Insertion Sort: posición del "hueco" donde está la carta levantada. */
  hueco?: number;
  /** Cómo debe verse la lista si difiere del arreglo real (Merge Sort mientras mezcla). */
  vista?: number[];
}

export interface Algoritmo {
  id: string;
  nombre: string;
  idea: string;
  velocidad: "Lento · O(n²)" | "Rápido · O(n log n)";
  /** Código TypeScript que se muestra en pantalla. */
  codigo: string;
  /** Ordena `a` en el lugar y va entregando cada paso. */
  pasos: (a: number[]) => Generator<Paso, void, undefined>;
}
