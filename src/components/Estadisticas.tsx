import { Card, SimpleGrid, Text } from "@mantine/core";

interface Props {
  comparaciones: number;
  movimientos: number;
  paso: number;
  total: number;
}

function Dato({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return (
    <div className="dato">
      <Text className="dato-valor numero">{valor}</Text>
      <Text size="sm" fw={700} className="dato-etiqueta">
        {etiqueta}
      </Text>
    </div>
  );
}

export function Estadisticas({ comparaciones, movimientos, paso, total }: Props) {
  return (
    <Card padding={12} className="tarjeta">
      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing={8}>
        <Dato valor={String(comparaciones)} etiqueta="comparaciones" />
        <Dato valor={String(movimientos)} etiqueta="movimientos" />
        <Dato valor={`${paso}/${total}`} etiqueta="pasos" />
      </SimpleGrid>
    </Card>
  );
}
