import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Tooltip } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import type { Fotograma } from "../fotogramas";
import { colorDe, estadoDe, etiquetaDe, fueraDeRango } from "../estados";

interface Props {
  fotograma: Fotograma;
  /** Valor máximo de los datos: fija la escala para que no cambie durante la ejecución. */
  maximo: number;
  /** Duración del desplazamiento de las columnas, en segundos. */
  duracion: number;
}

/**
 * Cada columna tiene una identidad estable (`fotograma.ids`). Cuando cambia de posición,
 * Motion la desliza hasta su nuevo lugar, con su número encima: nada se redibuja ni parpadea.
 */
export function GraficoBarras({ fotograma, maximo, duracion }: Props) {
  const reducido = useReducedMotion();
  const { vista, ids, paso } = fotograma;
  const n = vista.length;
  const transicion = reducido ? { duration: 0 } : { type: "spring" as const, duration: duracion, bounce: 0 };

  return (
    <div
      className="columnas"
      data-densas={n > 20}
      data-sin-numeros={n > 28}
      style={{ "--n": n } as CSSProperties}
      role="img"
      aria-label={`Columnas con los valores ${vista.join(", ")}`}
    >
      {vista.map((valor, i) => {
        const estado = estadoDe(i, fotograma);
        const levantada = paso?.hueco === i && paso.carta != null;
        return (
          <Tooltip
            key={ids[i]}
            label={`Posición ${i} · valor ${valor} · ${etiquetaDe(estado)}`}
            openDelay={200}
            withinPortal
          >
            <motion.div
              layout="position"
              transition={transicion}
              animate={{ y: levantada ? -26 : 0 }}
              className="columna"
              data-fuera={fueraDeRango(i, fotograma)}
            >
              <div
                className="columna-barra"
                style={{ height: `${(valor / maximo) * 100}%`, backgroundColor: colorDe(estado) }}
              >
                <span className="columna-valor">{valor}</span>
              </div>
            </motion.div>
          </Tooltip>
        );
      })}
    </div>
  );
}
