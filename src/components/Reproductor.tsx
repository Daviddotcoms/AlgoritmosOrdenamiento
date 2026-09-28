import { ActionIcon, Button, Group, Kbd, Slider, Stack, Text, Tooltip } from "@mantine/core";
import {
  IconGauge,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconRotate,
} from "@tabler/icons-react";
import { IconoAlternable } from "./IconoAlternable";

interface Props {
  indice: number;
  ultimo: number;
  reproduciendo: boolean;
  terminado: boolean;
  velocidad: number;
  onVelocidad: (v: number) => void;
  alternar: () => void;
  atras: () => void;
  adelante: () => void;
  reiniciar: () => void;
  irA: (i: number) => void;
}

function Atajo({ texto, tecla }: { texto: string; tecla: string }) {
  return (
    <Group gap={6} wrap="nowrap">
      {texto}
      <Kbd size="xs">{tecla}</Kbd>
    </Group>
  );
}

export function Reproductor(p: Props) {
  const pasos = Math.max(p.ultimo - 1, 0);
  const pasoActual = Math.min(p.indice, pasos);
  const etiquetaPrincipal = p.reproduciendo ? "Pausa" : p.terminado ? "Otra vez" : "Reproducir";

  return (
    <Stack gap="md">
      <Stack gap={6}>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Paso <span className="numero">{pasoActual}</span> de <span className="numero">{pasos}</span>
          </Text>
          <Text size="sm" c="dimmed" className="numero">
            {p.ultimo > 0 ? Math.round((p.indice / p.ultimo) * 100) : 0}%
          </Text>
        </Group>
        <Slider
          value={p.indice}
          min={0}
          max={p.ultimo}
          onChange={p.irA}
          label={null}
          size="md"
          aria-label="Línea de tiempo de la ejecución"
        />
      </Stack>

      <Group justify="space-between" gap="md">
        <Group gap="xs">
          <Button
            size="md"
            w={{ base: 132, xs: 156 }}
            onClick={p.alternar}
            leftSection={
              <IconoAlternable
                activo={p.reproduciendo ? "b" : "a"}
                a={<IconPlayerPlay size={20} stroke={2} />}
                b={<IconPlayerPause size={20} stroke={2} />}
              />
            }
          >
            {etiquetaPrincipal}
          </Button>
          <Tooltip label={<Atajo texto="Paso anterior" tecla="←" />}>
            <ActionIcon variant="default" size={42} onClick={p.atras} disabled={p.indice === 0} aria-label="Paso anterior">
              <IconPlayerTrackPrev size={20} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={<Atajo texto="Paso siguiente" tecla="→" />}>
            <ActionIcon variant="default" size={42} onClick={p.adelante} disabled={p.terminado} aria-label="Paso siguiente">
              <IconPlayerTrackNext size={20} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={<Atajo texto="Reiniciar" tecla="R" />}>
            <ActionIcon variant="default" size={42} onClick={p.reiniciar} disabled={p.indice === 0} aria-label="Reiniciar">
              <IconRotate size={20} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Group gap="sm" wrap="nowrap" w={{ base: "100%", xs: 240 }}>
          <IconGauge size={20} stroke={1.5} aria-hidden className="icono-tenue" />
          <Slider
            flex={1}
            min={1}
            max={10}
            value={p.velocidad}
            onChange={p.onVelocidad}
            label={(v) => `Velocidad ${v}`}
            aria-label="Velocidad de reproducción"
          />
        </Group>
      </Group>
    </Stack>
  );
}
