import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, Cog, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatarPreco, type Moto } from "@/data/motos";

export function MotoCard({ moto }: { moto: Moto }) {
  return (
    <Card className="group h-full overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      <div className="relative bg-secondary/60">
        {moto.destaque ? (
          <Badge className="absolute left-3 top-3 z-10">{moto.destaque}</Badge>
        ) : null}
        <img
          src={moto.imagem}
          alt={`Moto ${moto.nome} disponível para locação na LocaG`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {moto.categoria}
          </p>
          <h3 className="text-lg font-bold">{moto.nome}</h3>
        </div>

        <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" /> {moto.cilindrada}
          </li>
          <li className="flex items-center gap-2">
            <Cog className="h-4 w-4 text-primary" /> {moto.cambio}
          </li>
          <li className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-primary" /> {moto.consumo}
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Capacete incluso
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">a partir de</p>
          <p className="text-xl font-extrabold text-foreground">
            {formatarPreco(moto.precoDia)}
            <span className="text-sm font-medium text-muted-foreground">/dia</span>
          </p>
        </div>
        <Button asChild>
          <Link to="/simulacao">
            Alugar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
