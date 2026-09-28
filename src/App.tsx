import { useEffect, useMemo, useState } from "react";
import {
  AppShell,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Select,
  SegmentedControl,
  Slider,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconArrowsShuffle } from "@tabler/icons-react";
import { algoritmos } from "./algoritmos";
import { calcularFotogramas } from "./fotogramas";
import { useReproductor } from "./hooks/useReproductor";
import { generarDatos, leerDatos, TIPOS_DATOS, type TipoDatos } from "./datos";
import { colorDe, ESTADOS, ORDEN_LEYENDA } from "./estados";
import { Encabezado } from "./components/Encabezado";
import { GraficoBarras } from "./components/GraficoBarras";
import { PanelCodigo } from "./components/PanelCodigo";
import { Narrador } from "./components/Narrador";
import { Reproductor } from "./components/Reproductor";
import { Estadisticas } from "./components/Estadisticas";

const DATOS_INICIALES = [5, 1, 4, 2, 8, 3, 7, 6];

// Atajos: no se disparan mientras se escribe ni sobre controles que ya usan esas teclas.
function ignorar(e: KeyboardEvent, tecla: "espacio" | "flecha" | "letra") {
  const t = e.target as HTMLElement | null;
  if (!t) return false;
  if (t.getAttribute("role") === "slider") return tecla !== "letra";
  if (t.tagName === "INPUT") {
    const tipo = (t as HTMLInputElement).type;
    if (tipo === "text" || tipo === "search") return true;
    return tecla === "flecha"; // radios del selector de algoritmo
  }
  if (t.tagName === "BUTTON") return tecla === "espacio";
  return false;
}

export default function App() {
  const [algoritmoId, setAlgoritmoId] = useState(algoritmos[0].id);
  const [tipoDatos, setTipoDatos] = useState<TipoDatos>("azar");
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [texto, setTexto] = useState(DATOS_INICIALES.join(", "));
  const [error, setError] = useState<string | null>(null);
  const [velocidad, setVelocidad] = useState(5);

  const algoritmo = algoritmos.find((a) => a.id === algoritmoId) ?? algoritmos[0];
  const fotogramas = useMemo(() => calcularFotogramas(algoritmo, datos), [algoritmo, datos]);
  const r = useReproductor(fotogramas.length, velocidad);
  const { reiniciar } = r;

  // Al cambiar el algoritmo o los datos, la ejecución vuelve al inicio.
  useEffect(() => reiniciar(), [fotogramas, reiniciar]);

  const f = fotogramas[Math.min(r.indice, fotogramas.length - 1)];
  const pasosTotales = fotogramas.length - 2;
  const maximo = Math.max(...datos);
  const rapido = algoritmo.velocidad.startsWith("Rápido");
  const mensaje = f.terminado
    ? `¡Listo! ${algoritmo.nombre} ordenó ${f.vista.length} números en ${pasosTotales} pasos.`
    : (f.paso?.mensaje ?? "Presiona «Reproducir» o avanza de a un paso para empezar.");

  function usarDatos(nuevos: number[]) {
    setDatos(nuevos);
    setTexto(nuevos.join(", "));
    setError(null);
  }

  function cambiarTipo(tipo: TipoDatos) {
    setTipoDatos(tipo);
    usarDatos(generarDatos(tipo, datos.length));
  }

  function confirmarTexto() {
    const numeros = leerDatos(texto);
    if (numeros) usarDatos(numeros);
    else setError("Entre 2 y 40 números enteros del 1 al 99, separados por comas");
  }

  useHotkeys(
    [
      ["space", (e) => !ignorar(e, "espacio") && r.alternar()],
      ["ArrowRight", (e) => !ignorar(e, "flecha") && r.adelante()],
      ["ArrowLeft", (e) => !ignorar(e, "flecha") && r.atras()],
      ["r", (e) => !ignorar(e, "letra") && r.reiniciar()],
      ...algoritmos.map(
        (a, i) => [String(i + 1), (e: KeyboardEvent) => !ignorar(e, "letra") && setAlgoritmoId(a.id)] as [string, (e: KeyboardEvent) => void],
      ),
    ],
    ["TEXTAREA"],
  );

  const opcionesAlgoritmo = algoritmos.map((a) => ({ value: a.id, label: a.nombre }));

  return (
    <AppShell header={{ height: 72 }} padding={0}>
      <AppShell.Header>
        <Encabezado />
      </AppShell.Header>

      <AppShell.Main>
        <Container size={1560} px={{ base: "md", md: "xl" }} py={12}>
          <Stack gap="lg">
            {/* Selección de algoritmo y datos */}
            <Card padding="md" className="tarjeta">
              <Stack gap="md">
                <SegmentedControl
                  visibleFrom="sm"
                  fullWidth
                  size="md"
                  radius="md"
                  value={algoritmoId}
                  onChange={setAlgoritmoId}
                  data={opcionesAlgoritmo}
                  aria-label="Algoritmo"
                />
                <Select
                  hiddenFrom="sm"
                  label="Algoritmo"
                  value={algoritmoId}
                  onChange={(v) => v && setAlgoritmoId(v)}
                  data={opcionesAlgoritmo}
                  allowDeselect={false}
                />
                <Group align="flex-end" gap="md" wrap="wrap">
                  <Stack gap={6} w={{ base: "100%", sm: "auto" }}>
                    <Text size="sm" fw={500}>
                      Tipo de datos
                    </Text>
                    <SegmentedControl
                      visibleFrom="sm"
                      size="sm"
                      radius="md"
                      value={tipoDatos}
                      onChange={(v) => cambiarTipo(v as TipoDatos)}
                      data={TIPOS_DATOS}
                    />
                    <Select
                      hiddenFrom="sm"
                      value={tipoDatos}
                      onChange={(v) => v && cambiarTipo(v as TipoDatos)}
                      data={TIPOS_DATOS}
                      allowDeselect={false}
                      aria-label="Tipo de datos"
                    />
                  </Stack>
                  <Stack gap={6} w={200}>
                    <Text size="sm" fw={500}>
                      Cantidad: <span className="numero">{datos.length}</span>
                    </Text>
                    <Slider
                      min={5}
                      max={40}
                      value={datos.length}
                      onChange={(n) => usarDatos(generarDatos(tipoDatos, n))}
                      label={null}
                      aria-label="Cantidad de números"
                    />
                  </Stack>
                  <TextInput
                    flex={1}
                    miw={240}
                    label="Tus números"
                    value={texto}
                    error={error}
                    onChange={(e) => setTexto(e.currentTarget.value)}
                    onBlur={confirmarTexto}
                    onKeyDown={(e) => e.key === "Enter" && confirmarTexto()}
                    inputMode="numeric"
                    spellCheck={false}
                    classNames={{ input: "entrada-numeros" }}
                  />
                  <Button
                    variant="default"
                    leftSection={<IconArrowsShuffle size={18} stroke={1.75} />}
                    onClick={() => usarDatos(generarDatos(tipoDatos, datos.length))}
                  >
                    Generar otros
                  </Button>
                </Group>
              </Stack>
            </Card>

            <Grid gap="lg">
              {/* Visualización */}
              <Grid.Col span={{ base: 12, lg: 7 }}>
                <Card padding="lg" h="100%" className="tarjeta">
                  <Stack gap="sm" h="100%">
                    <Stack gap={6}>
                      <Group gap="sm">
                        <Title order={2} fz={30}>
                          {algoritmo.nombre}
                        </Title>
                        <Badge size="lg" radius="sm" tt="none" className={rapido ? "insignia insignia-azul" : "insignia insignia-naranja"}>
                          {algoritmo.velocidad}
                        </Badge>
                      </Group>
                      <Text c="dimmed" fz={18} fw={600}>
                        {algoritmo.idea}
                      </Text>
                    </Stack>

                    <GraficoBarras
                      fotograma={f}
                      maximo={maximo}
                      duracion={r.reproduciendo ? Math.min(0.45, Math.max(0.12, (r.demora * 0.8) / 1000)) : 0.4}
                    />

                    <Group gap="lg" wrap="wrap" className="leyenda" style={{ rowGap: 6 }} aria-label="Leyenda de colores">
                      {ORDEN_LEYENDA.map((estado) => (
                        <Group key={estado} gap={8} wrap="nowrap">
                          <span className="muestra" style={{ background: colorDe(estado) }} />
                          <Text size="sm">{ESTADOS[estado].etiqueta}</Text>
                        </Group>
                      ))}
                    </Group>

                    <Reproductor
                      indice={r.indice}
                      ultimo={r.ultimo}
                      reproduciendo={r.reproduciendo}
                      terminado={f.terminado}
                      velocidad={velocidad}
                      onVelocidad={setVelocidad}
                      alternar={r.alternar}
                      atras={r.atras}
                      adelante={r.adelante}
                      reiniciar={r.reiniciar}
                      irA={r.irA}
                    />

                    <Narrador fotograma={f} mensaje={mensaje} />
                  </Stack>
                </Card>
              </Grid.Col>

              {/* Código */}
              <Grid.Col span={{ base: 12, lg: 5 }}>
                <Stack gap="lg" h="100%">
                  <Estadisticas
                    comparaciones={f.comparaciones}
                    movimientos={f.movimientos}
                    paso={Math.min(r.indice, pasosTotales)}
                    total={pasosTotales}
                  />
                  <PanelCodigo archivo={`${algoritmo.id}Sort.ts`} codigo={algoritmo.codigo} linea={f.paso?.linea ?? null} />
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
