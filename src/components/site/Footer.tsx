import { Link } from "@tanstack/react-router";
import { Bike, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bike className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Loca<span className="text-primary">G</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Locação de motos por diária, semana ou mês. Retirada rápida, seguro incluso e
            assistência 24 horas.
          </p>
          <div className="mt-4 flex gap-3">
            <Instagram className="h-5 w-5 text-muted-foreground" />
            <Facebook className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Navegação</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/motos" className="hover:text-primary">
                Nossas motos
              </Link>
            </li>
            <li>
              <Link to="/simulacao" className="hover:text-primary">
                Simular contratação
              </Link>
            </li>
            <li>
              <Link to="/entrar" className="hover:text-primary">
                Entrar na conta
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Ajuda</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Perguntas frequentes</li>
            <li>Documentos necessários</li>
            <li>Política de cancelamento</li>
            <li>Termos de uso</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 0800 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> contato@locag.com.br
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Unidades em todo o Brasil
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LocaG Locação de Motos — site demonstrativo, valores e
        unidades ilustrativos.
      </div>
    </footer>
  );
}
