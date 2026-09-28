import { useEffect, useRef } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import { Badge, Card, Group, Text } from "@mantine/core";
import { IconBrandTypescript } from "@tabler/icons-react";
import { PALETA } from "../tema";

// Los mismos colores del código en las diapositivas.
const temaDiapositivas: PrismTheme = {
  plain: { color: PALETA.crema, backgroundColor: PALETA.navy },
  styles: [
    { types: ["keyword", "boolean", "null", "undefined"], style: { color: "#F7A24B" } },
    { types: ["builtin", "class-name", "maybe-class-name"], style: { color: "#8DB8F5" } },
    { types: ["comment"], style: { color: "#9AA3C2", fontStyle: "italic" } },
    { types: ["number"], style: { color: "#F6D06A" } },
    { types: ["string"], style: { color: "#A8D8A0" } },
    { types: ["operator", "punctuation"], style: { color: "#C9D1E8" } },
  ],
};

interface Props {
  archivo: string;
  codigo: string;
  /** Línea activa (empieza en 1) o null si no se está ejecutando nada. */
  linea: number | null;
}

export function PanelCodigo({ archivo, codigo, linea }: Props) {
  const panel = useRef<HTMLPreElement>(null);
  const activa = useRef<HTMLDivElement>(null);

  // Mantiene visible la línea activa desplazando solo el panel, nunca la página.
  useEffect(() => {
    const pre = panel.current;
    const l = activa.current;
    if (!pre || !l) return;
    const arriba = l.offsetTop;
    const abajo = arriba + l.offsetHeight;
    if (arriba < pre.scrollTop + 8) pre.scrollTop = arriba - 8;
    else if (abajo > pre.scrollTop + pre.clientHeight - 8) pre.scrollTop = abajo - pre.clientHeight + 8;
  }, [linea]);

  return (
    <Card padding={8} className="tarjeta tarjeta-codigo">
      <Group px={12} pt={6} pb={12} justify="space-between">
        <Group gap={8}>
          <IconBrandTypescript size={20} stroke={1.5} color={PALETA.azul} aria-hidden />
          <Text ff="monospace" size="sm" fw={700}>
            {archivo}
          </Text>
        </Group>
        <Badge size="lg" radius="sm" tt="none" className="insignia insignia-naranja insignia-linea" data-visible={linea !== null}>
          Línea {linea ?? "–"}
        </Badge>
      </Group>

      <Highlight code={codigo} language="tsx" theme={temaDiapositivas}>
        {({ tokens, getLineProps, getTokenProps, style }) => (
          <pre ref={panel} className="codigo" style={style} aria-label={`Código de ${archivo}`}>
            {tokens.map((tokensLinea, i) => {
              const esActiva = linea === i + 1;
              const props = getLineProps({ line: tokensLinea });
              const clases = [props.className, "codigo-linea"];
              if (esActiva) clases.push("activa");
              else if (linea !== null) clases.push("atenuada");
              return (
                <div key={i} {...props} ref={esActiva ? activa : undefined} className={clases.join(" ")}>
                  <span className="codigo-numero" aria-hidden>
                    {i + 1}
                  </span>
                  <span>
                    {tokensLinea.map((token, k) => (
                      <span key={k} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </Card>
  );
}
