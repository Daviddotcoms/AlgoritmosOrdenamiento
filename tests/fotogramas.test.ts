import { test } from "node:test";
import assert from "node:assert/strict";
import { algoritmos } from "../src/algoritmos";
import { calcularFotogramas } from "../src/fotogramas";

const datos = [5, 1, 4, 2, 8, 3, 7, 6];
const ordenar = (a: number[]) => [...a].sort((x, y) => x - y);

for (const algoritmo of algoritmos) {
  test(`${algoritmo.nombre}: el último fotograma está ordenado y completo`, () => {
    const f = calcularFotogramas(algoritmo, datos);
    const ultimo = f[f.length - 1];
    assert.deepEqual(ultimo.vista, ordenar(datos));
    assert.equal(ultimo.terminado, true);
    assert.equal(ultimo.fijos.length, datos.length);
    assert.deepEqual(f[0].vista, datos, "el primer fotograma muestra los datos originales");
  });

  test(`${algoritmo.nombre}: cada vista es una reordenación de las mismas columnas`, () => {
    for (const caso of [datos, [3, 3, 1, 3, 2, 1], [9, 8, 7, 6, 5, 4, 3, 2, 1]]) {
      const esperado = ordenar(caso);
      const cantidad = caso.length;
      for (const f of calcularFotogramas(algoritmo, caso)) {
        assert.deepEqual(ordenar(f.vista), esperado, `vista con valores distintos: [${f.vista}]`);
        assert.deepEqual([...f.ids].sort((x, y) => x - y), [...Array(cantidad).keys()], `ids repetidos: [${f.ids}]`);
      }
    }
  });

  test(`${algoritmo.nombre}: cada columna conserva su valor a lo largo de la ejecución`, () => {
    const f = calcularFotogramas(algoritmo, datos);
    const valorDe = new Map<number, number>();
    for (const fotograma of f) {
      fotograma.ids.forEach((id, i) => {
        const v = fotograma.vista[i];
        if (valorDe.has(id)) assert.equal(valorDe.get(id), v, `la columna ${id} cambió de ${valorDe.get(id)} a ${v}`);
        else valorDe.set(id, v);
      });
    }
  });

  test(`${algoritmo.nombre}: los contadores nunca bajan y las líneas existen`, () => {
    const f = calcularFotogramas(algoritmo, datos);
    const lineas = algoritmo.codigo.split("\n").length;
    for (let i = 1; i < f.length; i++) {
      assert.ok(f[i].comparaciones >= f[i - 1].comparaciones);
      assert.ok(f[i].movimientos >= f[i - 1].movimientos);
      const linea = f[i].paso?.linea;
      if (linea !== undefined) assert.ok(linea >= 1 && linea <= lineas);
    }
  });
}

test("los datos originales no se modifican", () => {
  const copia = [...datos];
  for (const algoritmo of algoritmos) calcularFotogramas(algoritmo, datos);
  assert.deepEqual(datos, copia);
});
