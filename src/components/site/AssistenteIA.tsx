import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Mensagem = { id: number; autor: "ia" | "usuario"; texto: string };

const sugestoes = [
  "Qual moto é mais econômica?",
  "Como funciona o seguro?",
  "Quais documentos preciso?",
  "Posso alugar por mês?",
];

const respostas: { chave: string[]; texto: string }[] = [
  {
    chave: ["econ", "barat", "consumo", "gasolina"],
    texto:
      "A **Honda Biz 125** é a mais econômica da frota: cerca de 45 km/l e diária de R$ 69. Para uso urbano diário, ela costuma ser a melhor escolha.",
  },
  {
    chave: ["seguro", "sinistro", "batida"],
    texto:
      "Todas as diárias já incluem seguro básico com proteção contra terceiros. Na simulação você pode adicionar a Proteção Total por R$ 19/dia, que reduz a participação em caso de sinistro.",
  },
  {
    chave: ["documento", "cnh", "habilita", "cpf"],
    texto:
      "Você precisa de CNH categoria A válida há mais de 6 meses, documento com foto, CPF e um cartão de crédito no nome do condutor para a caução.",
  },
  {
    chave: ["mes", "mês", "mensal", "plano", "semana"],
    texto:
      "Sim! Temos os planos Diário, Semanal (10% off) e Mensal (25% off). O plano mensal já inclui manutenção preventiva e troca de óleo.",
  },
  {
    chave: ["preço", "preco", "valor", "quanto"],
    texto:
      "As diárias começam em R$ 69 (Biz 125) e vão até R$ 189 (XRE 300). Use a página de Simulação para ver o valor total do seu período.",
  },
  {
    chave: ["entrega", "retirada", "loja", "onde"],
    texto:
      "A retirada é feita nas nossas unidades e leva cerca de 15 minutos. Também oferecemos entrega no endereço indicado por uma taxa adicional.",
  },
];

function responder(pergunta: string) {
  const texto = pergunta.toLowerCase();
  const achou = respostas.find((r) => r.chave.some((c) => texto.includes(c)));
  return (
    achou?.texto ??
    "Posso te ajudar a escolher a moto ideal, explicar planos, seguro e documentos. Experimente perguntar sobre preços, seguro ou o plano mensal. (Este assistente é uma demonstração.)"
  );
}

export function AssistenteIA() {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [digitando, setDigitando] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      autor: "ia",
      texto:
        "Olá! Sou o Léo, assistente virtual da LocaG. Posso indicar a moto ideal para o seu perfil e tirar dúvidas sobre a locação.",
    },
  ]);
  const fimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, digitando]);

  const enviar = (valor: string) => {
    const pergunta = valor.trim();
    if (!pergunta) return;
    setMensagens((atual) => [
      ...atual,
      { id: Date.now(), autor: "usuario", texto: pergunta },
    ]);
    setTexto("");
    setDigitando(true);
    window.setTimeout(() => {
      setMensagens((atual) => [
        ...atual,
        { id: Date.now() + 1, autor: "ia", texto: responder(pergunta) },
      ]);
      setDigitando(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {aberto ? (
        <div className="flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Léo · Assistente LocaG</p>
                <p className="text-xs opacity-80">Online agora</p>
              </div>
            </div>
            <button
              onClick={() => setAberto(false)}
              aria-label="Fechar assistente"
              className="rounded-md p-1 transition-colors hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-background p-4">
            {mensagens.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                  m.autor === "usuario"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {m.texto}
              </div>
            ))}
            {digitando ? (
              <div className="w-fit rounded-2xl bg-secondary px-3 py-2 text-sm text-muted-foreground">
                digitando...
              </div>
            ) : null}
            <div ref={fimRef} />
          </div>

          <div className="border-t border-border bg-card p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {sugestoes.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviar(texto);
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva sua dúvida..."
                aria-label="Mensagem para o assistente"
              />
              <Button type="submit" size="icon" aria-label="Enviar mensagem">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : null}

      <Button
        onClick={() => setAberto((v) => !v)}
        size="lg"
        className="h-14 rounded-full shadow-lg"
        aria-label="Abrir assistente virtual"
      >
        <MessageCircle className="h-5 w-5" />
        {aberto ? "Fechar" : "Fale com a IA"}
      </Button>
    </div>
  );
}
