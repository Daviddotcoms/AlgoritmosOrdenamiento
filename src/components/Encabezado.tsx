import { Group, Kbd, Stack, Text, Title } from "@mantine/core";

export function Encabezado() {
  return (
    <Group h="100%" px={{ base: "md", md: "xl" }} justify="space-between" wrap="nowrap" className="encabezado">
      <Stack gap={2}>
        <Text className="antetitulo">Entorno práctico</Text>
        <Title order={1} fz={{ base: 20, sm: 28 }} lh={1.1}>
          ¿Cómo ordena una computadora?
        </Title>
      </Stack>

      <Group gap={8} visibleFrom="md" className="atajos" wrap="nowrap">
        <Kbd>Espacio</Kbd> reproducir
        <Kbd>←</Kbd>
        <Kbd>→</Kbd> pasos
        <Kbd>R</Kbd> reiniciar
        <Kbd>1–5</Kbd> algoritmo
      </Group>
    </Group>
  );
}
