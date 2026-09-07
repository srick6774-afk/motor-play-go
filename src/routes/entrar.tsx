import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar na conta LocaG | Locação de motos" },
      {
        name: "description",
        content:
          "Acesse sua conta LocaG para acompanhar reservas, contratos e faturas da sua locação de motos.",
      },
      { property: "og:title", content: "Entrar na conta LocaG" },
      {
        property: "og:description",
        content: "Acesse sua conta LocaG para acompanhar reservas e contratos de locação de motos.",
      },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  const aviso = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Demonstração", {
      description: "Este site é apenas visual, o acesso ainda não está ativo.",
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Área do cliente</CardTitle>
          <CardDescription>
            Acompanhe suas reservas, contratos e faturas em um só lugar.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="cadastro">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={aviso} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="voce@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input id="senha" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox id="lembrar" /> Lembrar de mim
                  </label>
                  <span className="cursor-pointer text-sm text-primary hover:underline">
                    Esqueci minha senha
                  </span>
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="cadastro">
              <form onSubmit={aviso} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-cad">E-mail</Label>
                  <Input id="email-cad" type="email" placeholder="voce@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnh">Número da CNH</Label>
                  <Input id="cnh" placeholder="00000000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha-cad">Senha</Label>
                  <Input id="senha-cad" type="password" placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full">
                  Criar conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Site demonstrativo LocaG — nenhum dado é enviado ou armazenado.
      </p>
    </div>
  );
}
