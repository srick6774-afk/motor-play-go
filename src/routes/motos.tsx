import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MotoCard } from "@/components/site/MotoCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatarPreco, motos } from "@/data/motos";

export const Route = createFileRoute("/motos")({
  head: () => ({
    meta: [
      { title: "Motos para alugar | LocaG" },
      {
        name: "description",
        content:
          "Veja a frota LocaG: scooters, urbanas, esportivas e trail com diárias a partir de R$ 69, capacete e seguro inclusos.",
      },
      { property: "og:title", content: "Motos para alugar | LocaG" },
      {
        property: "og:description",
        content: "Frota completa de motos para locação com diárias a partir de R$ 69.",
      },
    ],
  }),
  component: MotosPage,
});

const categorias = ["Todas", "Urbana", "Scooter", "Esportiva", "Trail"] as const;
const cambios = ["Todos", "Manual", "Automático"] as const;

function MotosPage() {
  const [categoria, setCategoria] = useState<(typeof categorias)[number]>("Todas");
  const [cambio, setCambio] = useState<(typeof cambios)[number]>("Todos");
  const [precoMax, setPrecoMax] = useState(200);

  const filtradas = useMemo(
    () =>
      motos.filter(
        (m) =>
          (categoria === "Todas" || m.categoria === categoria) &&
          (cambio === "Todos" || m.cambio === cambio) &&
          m.precoDia <= precoMax,
      ),
    [categoria, cambio, precoMax],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Nossa frota</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Motos revisadas, com capacete, seguro básico e assistência 24 horas inclusos em todas as
          diárias.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="h-fit space-y-6 rounded-xl border border-border bg-card p-5">
          <div>
            <Label className="text-sm font-semibold">Categoria</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {categorias.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={categoria === c ? "default" : "outline"}
                  onClick={() => setCategoria(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold">Câmbio</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {cambios.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={cambio === c ? "default" : "outline"}
                  onClick={() => setCambio(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold">
              Diária até {formatarPreco(precoMax)}
            </Label>
            <Slider
              className="mt-4"
              value={[precoMax]}
              min={60}
              max={200}
              step={10}
              onValueChange={(v) => setPrecoMax(v[0] ?? 200)}
            />
          </div>
        </aside>

        <section>
          <p className="mb-4 text-sm text-muted-foreground">
            {filtradas.length} moto(s) encontrada(s)
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtradas.map((moto) => (
              <MotoCard key={moto.id} moto={moto} />
            ))}
          </div>
          {filtradas.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
              Nenhuma moto com esses filtros. Tente aumentar o valor da diária.
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
