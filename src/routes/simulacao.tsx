import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatarPreco, motos } from "@/data/motos";

export const Route = createFileRoute("/simulacao")({
  validateSearch: (search: Record<string, unknown>) => ({
    moto: typeof search.moto === "string" ? search.moto : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Simular locação de moto | LocaG" },
      {
        name: "description",
        content:
          "Monte sua locação: escolha a moto, o período e os extras e veja o valor total estimado da sua contratação na LocaG.",
      },
      { property: "og:title", content: "Simular locação de moto | LocaG" },
      {
        property: "og:description",
        content: "Escolha moto, período e extras e veja o valor estimado da sua locação.",
      },
    ],
  }),
  component: SimulacaoPage,
});

const extras = [
  { id: "capacete", nome: "Capacete extra (garupa)", valor: 9 },
  { id: "protecao", nome: "Proteção Total (reduz participação)", valor: 19 },
  { id: "bau", nome: "Baú 45L para entregas", valor: 12 },
  { id: "km", nome: "Quilometragem livre", valor: 25 },
];

const etapas = ["Moto e período", "Condutor", "Extras"];

function SimulacaoPage() {
  const { moto: motoBuscada } = Route.useSearch();
  const [etapa, setEtapa] = useState(0);
  const [motoId, setMotoId] = useState(motoBuscada ?? motos[0].id);
  const [dias, setDias] = useState(3);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [confirmado, setConfirmado] = useState(false);

  const moto = motos.find((m) => m.id === motoId) ?? motos[0];

  const { subtotal, extrasTotal, desconto, total } = useMemo(() => {
    const sub = moto.precoDia * dias;
    const ext = extras
      .filter((e) => selecionados.includes(e.id))
      .reduce((soma, e) => soma + e.valor * dias, 0);
    const perc = dias >= 30 ? 0.25 : dias >= 7 ? 0.1 : 0;
    const desc = sub * perc;
    return { subtotal: sub, extrasTotal: ext, desconto: desc, total: sub - desc + ext };
  }, [moto, dias, selecionados]);

  const alternarExtra = (id: string) =>
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((i) => i !== id) : [...atual, id],
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Simulação de contratação
        </h1>
        <p className="mt-2 text-muted-foreground">
          Monte sua locação em 3 passos e veja o valor estimado. Simulação sem compromisso.
        </p>
      </header>

      <ol className="mb-8 flex flex-wrap gap-3">
        {etapas.map((nome, i) => (
          <li
            key={nome}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
              i === etapa
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            <span className="font-semibold">{i + 1}</span> {nome}
          </li>
        ))}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <Card>
          <CardHeader>
            <CardTitle>{etapas[etapa]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {etapa === 0 ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {motos.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMotoId(m.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                        m.id === motoId
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <img
                        src={m.imagem}
                        alt={m.nome}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="h-14 w-20 rounded-lg object-cover"
                      />
                      <span>
                        <span className="block text-sm font-semibold">{m.nome}</span>
                        <span className="block text-sm text-muted-foreground">
                          {formatarPreco(m.precoDia)}/dia
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="retirada">Data de retirada</Label>
                    <Input id="retirada" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="devolucao">Data de devolução</Label>
                    <Input id="devolucao" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dias">Quantidade de diárias</Label>
                    <Input
                      id="dias"
                      type="number"
                      min={1}
                      max={90}
                      value={dias}
                      onChange={(e) => setDias(Math.max(1, Number(e.target.value) || 1))}
                    />
                  </div>
                </div>
              </>
            ) : null}

            {etapa === 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnh">CNH (categoria A)</Label>
                  <Input id="cnh" placeholder="00000000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tel">Telefone</Label>
                  <Input id="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cidade">Cidade de retirada</Label>
                  <Input id="cidade" placeholder="São Paulo - SP" />
                </div>
              </div>
            ) : null}

            {etapa === 2 ? (
              <div className="space-y-3">
                {extras.map((e) => (
                  <label
                    key={e.id}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4"
                  >
                    <span className="flex items-center gap-3">
                      <Checkbox
                        checked={selecionados.includes(e.id)}
                        onCheckedChange={() => alternarExtra(e.id)}
                      />
                      <span className="text-sm font-medium">{e.nome}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      + {formatarPreco(e.valor)}/dia
                    </span>
                  </label>
                ))}
              </div>
            ) : null}

            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                disabled={etapa === 0}
                onClick={() => setEtapa((e) => Math.max(0, e - 1))}
              >
                <ChevronLeft className="h-4 w-4" /> Voltar
              </Button>
              {etapa < 2 ? (
                <Button onClick={() => setEtapa((e) => Math.min(2, e + 1))}>
                  Continuar <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => setConfirmado(true)}>Confirmar simulação</Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-base">Resumo da simulação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <img
              src={moto.imagem}
              alt={moto.nome}
              loading="lazy"
              width={1024}
              height={768}
              className="h-32 w-full rounded-lg object-cover"
            />
            <p className="font-semibold">{moto.nome}</p>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {dias} diária(s) × {formatarPreco(moto.precoDia)}
              </span>
              <span>{formatarPreco(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Extras</span>
              <span>{formatarPreco(extrasTotal)}</span>
            </div>
            {desconto > 0 ? (
              <div className="flex justify-between text-primary">
                <span>Desconto do plano</span>
                <span>- {formatarPreco(desconto)}</span>
              </div>
            ) : null}
            <Separator />
            <div className="flex items-end justify-between">
              <span className="font-semibold">Total estimado</span>
              <span className="text-2xl font-extrabold">{formatarPreco(total)}</span>
            </div>

            {confirmado ? (
              <div className="flex items-start gap-2 rounded-lg bg-accent p-3 text-accent-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Simulação registrada! Em um site real, um consultor entraria em contato para
                  confirmar a retirada.
                </span>
              </div>
            ) : null}

            <p className="text-xs text-muted-foreground">
              Valores ilustrativos. Esta simulação é apenas demonstrativa.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
