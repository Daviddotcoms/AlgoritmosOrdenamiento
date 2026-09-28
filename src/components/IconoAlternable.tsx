import type { ReactNode } from "react";

/**
 * Cruza dos íconos con opacidad, escala y desenfoque (better-ui: contextual icon animation).
 * Ambos quedan en el DOM; el inactivo se superpone de forma absoluta.
 */
export function IconoAlternable({ activo, a, b }: { activo: "a" | "b"; a: ReactNode; b: ReactNode }) {
  return (
    <span className="icono-alternable" aria-hidden>
      <span className="icono-capa" data-visible={activo === "a"}>
        {a}
      </span>
      <span className="icono-capa" data-visible={activo === "b"}>
        {b}
      </span>
    </span>
  );
}
