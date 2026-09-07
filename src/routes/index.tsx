import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Headphones,
  MapPin,
  CalendarDays,
  Search,
  Wrench,
  Star,
} from "lucide-react";
import heroMoto from "@/assets/hero-moto.jpg";
import { MotoCard } from "@/components/site/MotoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motos } from "@/data/motos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocaG | Locação de motos por diária, semana ou mês" },
      {
        name: "description",
        content:
          "Alugue motos na LocaG a partir de R$ 69 por dia. Frota revisada, capacete e seguro inclusos, assistência 24h e simulação online em 3 passos.",
      },
      { property: "og:title", content: "LocaG | Locação de motos" },
      {
        property: "og:description",
        content:
          "Alugue motos a partir de R$ 69 por dia com seguro, capacete e assistência 24h inclusos.",
      },
    ],
  }),
  component: Index,
});

const vantagens = [
  { icon: ShieldCheck, titulo: "Seguro incluso", texto: "Proteção básica em todas as diárias." },
  { icon: Headphones, titulo: "Assistência 24h", texto: "Guincho e suporte em todo o país." },
  { icon: MapPin, titulo: "Retirada rápida", texto: "Saia rodando em cerca de 15 minutos." },
  { icon: Wrench, titulo: "Frota revisada", texto: "Manutenção preventiva em dia." },
];

const planos = [
  {
    nome: "Diária",
    preco: "a partir de R$ 69",
    itens: ["Ideal para o fim de semana", "Capacete incluso", "200 km por dia"],
  },
  {
    nome: "Semanal",
    preco: "10% de desconto",
    itens: ["Para viagens e freelas", "Troca de moto em caso de pane", "Km estendida"],
    destaque: true,
  },
  {
    nome: "Mensal",
    preco: "25% de desconto",
    itens: ["Perfeito para delivery", "Manutenção inclusa", "Troca de óleo grátis"],
  },
];

const depoimentos = [
  { nome: "Rafael M.", texto: "Retirei a moto em 10 minutos e usei o mês todo no delivery. Nota 10." },
  { nome: "Juliana P.", texto: "Atendimento rápido e moto impecável. O plano semanal salvou minha viagem." },
  { nome: "Carlos A.", texto: "Preço justo e sem burocracia. Já é a terceira vez que alugo." },
];

function Index() {
  return (
    <div>
      {/* Hero + busca */}
      <section className="relative">
        <img
          src={heroMoto}
          alt="Motociclista pilotando em avenida urbana ao entardecer"
          width={1920}
          height={1080}
          className="h-[32rem] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-transparent" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4">
            <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Diárias a partir de R$ 69
            </span>
            <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
              Alugue sua moto e siga sem parar
            </h1>
            <p className="mt-3 max-w-lg text-base text-primary-foreground/85">
              Frota revisada, seguro e capacete inclusos, retirada rápida e assistência 24 horas em
              todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto -mt-16 max-w-6xl px-4">
        <Card className="relative z-10 shadow-lg">
          <CardContent className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="local" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Local de retirada
              </Label>
              <Input id="local" placeholder="Cidade ou unidade LocaG" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ret" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Retirada
              </Label>
              <Input id="ret" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dev" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Devolução
              </Label>
              <Input id="dev" type="date" />
            </div>
            <Button asChild size="lg" className="md:mb-0">
              <Link to="/motos">
                <Search className="h-4 w-4" /> Buscar motos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Roleta de motos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Motos disponíveis</h2>
            <p className="mt-1 text-muted-foreground">
              Passe pelas opções e escolha a moto certa para o seu dia a dia.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/motos">Ver frota completa</Link>
          </Button>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {motos.map((moto) => (
              <CarouselItem key={moto.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <MotoCard moto={moto} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* Vantagens */}
      <section className="bg-secondary/50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {vantagens.map((v) => (
            <div key={v.titulo} className="rounded-xl bg-card p-6 shadow-sm">
              <v.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-bold">{v.titulo}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight">Planos que cabem no seu ritmo</h2>
        <p className="mt-1 text-muted-foreground">
          Quanto mais tempo com a moto, menor o valor da diária.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {planos.map((p) => (
            <Card
              key={p.nome}
              className={p.destaque ? "border-primary shadow-md" : undefined}
            >
              <CardContent className="space-y-4">
                {p.destaque ? (
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Mais escolhido
                  </span>
                ) : null}
                <h3 className="text-xl font-bold">{p.nome}</h3>
                <p className="text-lg font-semibold text-primary">{p.preco}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {p.itens.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" /> {i}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={p.destaque ? "default" : "outline"}>
                  <Link to="/simulacao">Simular</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-3xl font-extrabold tracking-tight">Quem já roda com a LocaG</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {depoimentos.map((d) => (
            <Card key={d.nome}>
              <CardContent className="space-y-3">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"{d.texto}"</p>
                <p className="text-sm font-semibold">{d.nome}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-extrabold">Pronto para pegar a estrada?</h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/85">
            Faça uma simulação em 3 passos e descubra o valor da sua locação agora mesmo.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to="/simulacao">Simular contratação</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
