import { useCallback, useEffect, useState } from "react";

export function demoraPara(velocidad: number): number {
  return Math.round(1400 / Math.pow(1.7, velocidad - 1));
}

/** Controla qué fotograma se muestra y la reproducción automática. */
export function useReproductor(total: number, velocidad: number) {
  const [indice, setIndice] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const ultimo = total - 1;
  const demora = demoraPara(velocidad);

  useEffect(() => {
    if (!reproduciendo) return;
    if (indice >= ultimo) {
      setReproduciendo(false);
      return;
    }
    const id = window.setTimeout(() => setIndice((i) => Math.min(i + 1, ultimo)), demora);
    return () => window.clearTimeout(id);
  }, [reproduciendo, indice, ultimo, demora]);

  const alternar = useCallback(() => {
    if (indice >= ultimo) setIndice(0);
    setReproduciendo((r) => !r);
  }, [indice, ultimo]);

  const adelante = useCallback(() => {
    setReproduciendo(false);
    setIndice((i) => Math.min(i + 1, ultimo));
  }, [ultimo]);

  const atras = useCallback(() => {
    setReproduciendo(false);
    setIndice((i) => Math.max(i - 1, 0));
  }, []);

  const reiniciar = useCallback(() => {
    setReproduciendo(false);
    setIndice(0);
  }, []);

  const irA = useCallback(
    (i: number) => {
      setReproduciendo(false);
      setIndice(Math.max(0, Math.min(i, ultimo)));
    },
    [ultimo],
  );

  return { indice, ultimo, reproduciendo, demora, alternar, adelante, atras, reiniciar, irA };
}
