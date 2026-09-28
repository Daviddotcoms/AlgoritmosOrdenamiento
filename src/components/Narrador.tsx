import { Badge, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import {
  IconArrowsExchange,
  IconCircleCheck,
  IconFocus2,
  IconHandFinger,
  IconPlayerPlay,
  IconScale,
  IconTrophy,
} from "@tabler/icons-react";
import type { Fotograma } from "../fotogramas";
import { ESTADOS } from "../estados";
import { PALETA } from "../tema";

interface Props {
  fotograma: Fotograma;
  mensaje: string;
}

function iconoDe(f: Fotograma) {
  const p = f.paso;
  if (f.terminado) return { Icono: IconTrophy, color: PALETA.naranjo };
  if (!p) return { Icono: IconPlayerPlay, color: PALETA.navy };
  if (p.cambiar || p.escribir !== undefined) return { Icono: IconArrowsExchange, color: ESTADOS.cambiar.color };
  if (p.comparar || p.comparo) return { Icono: IconScale, color: ESTADOS.comparar.color };
  if (p.fijos?.length) return { Icono: IconCircleCheck, color: ESTADOS.fijo.color };
  if (p.pivote !== undefined) return { Icono: IconFocus2, color: ESTADOS.pivote.color };
  return { Icono: IconFocus2, color: PALETA.navy };
}

export function Narrador({ fotograma, mensaje }: Props) {
  const { Icono, color } = iconoDe(fotograma);
  const carta = fotograma.paso?.carta;

  return (
    <Paper radius={16} p="sm" className="narrador">
      <Group gap="sm" wrap="nowrap" justify="space-between">
        <Group gap="sm" wrap="nowrap" miw={0}>
          <ThemeIcon size={44} radius={12} variant="filled" color={color} aria-hidden>
            <Icono size={24} stroke={2} />
          </ThemeIcon>
          <Text fz={{ base: "md", md: 22 }} fw={800} aria-live="polite" lh={1.3}>
            {mensaje}
          </Text>
        </Group>
        {carta != null && (
          <Badge
            size="xl"
            radius={12}
            variant="filled"
            color={ESTADOS.pivote.color}
            leftSection={<IconHandFinger size={18} stroke={2} />}
            tt="none"
            className="insignia-carta"
          >
            En la mano: {carta}
          </Badge>
        )}
      </Group>
    </Paper>
  );
}
