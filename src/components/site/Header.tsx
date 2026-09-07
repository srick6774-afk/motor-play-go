import { Link } from "@tanstack/react-router";
import { Menu, Bike, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/motos", label: "Motos" },
  { to: "/simulacao", label: "Simulação" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      {/* Espaço reservado para a logo oficial da LocaG */}
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Bike className="h-5 w-5" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-foreground">
        Loca<span className="text-primary">G</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/entrar">
              <UserRound className="h-4 w-4" />
              Entrar
            </Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/motos">Alugar agora</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-10 flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-base font-medium text-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/entrar" className="text-base font-medium text-foreground hover:text-primary">
                  Entrar
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
