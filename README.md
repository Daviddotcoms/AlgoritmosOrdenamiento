# Visualizador de algoritmos de ordenamiento · React

Web hecha con **React + TypeScript + Vite**, **Mantine** (componentes), **Motion** (animación de las columnas) y **prism-react-renderer** (código con colores), con la misma paleta de la presentación de la clase, para ver, paso a paso, cómo funcionan **Bubble Sort, Selection Sort, Insertion Sort, Merge Sort y Quick Sort**.

- Eliges el algoritmo y ves las columnas **deslizarse** a su nuevo lugar, cada una con su número.
- A la derecha está el **código TypeScript**, y se **ilumina la línea** que se está ejecutando.
- Un mensaje explica cada paso en palabras («¿5 > 1? Sí, están al revés»).
- Puedes ir **hacia adelante y hacia atrás**, o arrastrar la **línea de tiempo** a cualquier momento.
- Tipos de datos: **al azar, casi ordenados, al revés o con repetidos**, para comparar cómo reacciona cada algoritmo.
- Tooltip sobre cada columna y diseño adaptable a celular.

## Cómo usarlo

Requiere [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

| Control | Atajo | Qué hace |
|---|---|---|
| ▶ Reproducir / ⏸ Pausa | <kbd>Espacio</kbd> | Animación automática |
| ⏮ Atrás | <kbd>←</kbd> | Retrocede un paso |
| Un paso ⏭ | <kbd>→</kbd> | Avanza un paso |
| ↺ Reiniciar | <kbd>R</kbd> | Vuelve al inicio |
| Línea de tiempo | | Salta a cualquier punto de la ejecución |
| Tipo de datos / Cantidad / Generar otros | | Listas al azar, casi ordenadas, al revés o con repetidos |
| Tus números | | Escribe tus propios números (2 a 40, del 1 al 99) |
| Selector de algoritmo | <kbd>1</kbd>–<kbd>5</kbd> | Cambia de algoritmo |

```bash
npm test         # pruebas de los algoritmos y los fotogramas
npm run build    # versión publicable en dist/
```

## Cómo está hecho

```
src/
├── algoritmos/            Un archivo por algoritmo: el código que se muestra y su versión paso a paso
├── tipos.ts               Qué información trae cada paso (línea, comparación, intercambio…)
├── fotogramas.ts          Ejecuta el algoritmo completo y guarda una "foto" de cada paso
├── hooks/useReproductor.ts  Qué foto se muestra, reproducción y velocidad
├── estados.ts             Colores de cada estado (paleta de la presentación, validada para daltonismo)
├── datos.ts               Generadores de datos (al azar, casi ordenados, al revés, repetidos)
├── tema.ts                Tema de Mantine y paleta de la presentación
├── components/
│   ├── Encabezado.tsx     Título y atajos de teclado
│   ├── GraficoBarras.tsx  Columnas animadas con Motion (cada una conserva su identidad)
│   ├── PanelCodigo.tsx    Código con colores e iluminación de la línea activa
│   ├── Narrador.tsx       Explica en palabras cada paso
│   ├── Reproductor.tsx    Línea de tiempo y botones de reproducción
│   └── Estadisticas.tsx   Comparaciones, movimientos y pasos
├── App.tsx                Une todo
└── styles.css             Detalles de pulido (animaciones de íconos, presión de botones, código)
```

1. Cada algoritmo es una **función generadora** (`function*`) que, con `yield`, avisa qué está haciendo y en qué línea del código va.
2. `calcularFotogramas` recorre todos esos pasos y guarda el estado de la lista en cada uno, junto con la **identidad** de cada columna: así, cuando dos números se intercambian, se ve a cada columna viajar a su nueva posición.
3. El componente solo muestra el fotograma número `indice`: avanzar, retroceder o saltar es cambiar ese número.

## Retos

1. Agrega el tipo de datos **«Ya ordenados»** en `src/datos.ts` y compara cuántos pasos da cada algoritmo cuando no hay nada que hacer.
2. Agrega un sexto algoritmo (por ejemplo *Cocktail Sort*): crea `src/algoritmos/cocktail.ts` y súmalo en `index.ts`.
3. Muestra dos algoritmos lado a lado con los mismos datos para hacer una carrera.
