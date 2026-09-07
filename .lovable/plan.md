# LocaG — site de locação de motos (visual, sem funcionamento real)

Site inspirado na Localiza: verde vibrante, branco, visual limpo e comercial. Tudo em português e apenas visual — nada envia dados de verdade.

## Páginas

**Início**
- Topo com espaço reservado para a logo (coloco um marcador "LocaG" até você me enviar o arquivo) e menu: Motos, Planos, Ajuda, Entrar.
- Banner principal com a busca de retirada: local, data de retirada, data de devolução e botão "Buscar motos".
- Roleta/carrossel de motos: cada moto com foto, nome, categoria, itens (câmbio, cilindrada, capacete incluso), preço por dia e botão "Alugar".
- Faixa de planos (diária, semanal, mensal) e faixa de vantagens (seguro, assistência 24h, retirada em loja).
- Rodapé completo com links e contato.

**Motos**
- Lista com filtros visuais (categoria, faixa de preço, câmbio) e os cards de motos.

**Simulação de contratação**
- Passo a passo em 3 etapas: escolher a moto e o período, dados do condutor (nome, CPF, CNH), extras (capacete extra, seguro, baú).
- Resumo lateral com valor calculado na tela (diárias x preço + extras) e botão "Confirmar simulação" que mostra apenas uma confirmação visual.

**Entrar / Criar conta**
- Tela de login com e-mail e senha, "esqueci minha senha" e aba de cadastro. Só aparência, ninguém entra de verdade.

## Assistente com IA
- Bolha verde fixa no canto inferior direito. Ao clicar, abre uma janelinha de conversa com saudação, sugestões prontas ("Qual moto é mais econômica?", "Como funciona o seguro?") e respostas de exemplo já escritas. Sem inteligência artificial de verdade ligada por enquanto — dá para conectar depois se você quiser.

## Motos de exemplo (invento agora, você troca depois)
Honda CG 160 Start · R$ 79/dia — Honda Biz 125 · R$ 69/dia — Yamaha Fazer 250 · R$ 129/dia — Honda PCX 160 · R$ 149/dia — Yamaha Lander 250 · R$ 159/dia — Honda XRE 300 · R$ 189/dia. Fotos geradas por IA no mesmo estilo.

## Detalhes técnicos
- Rotas separadas: `/`, `/motos`, `/simulacao`, `/entrar`, cada uma com seu próprio título e descrição para busca.
- Paleta verde/branco definida como tokens no design system (`src/styles.css`); nenhuma cor fixa nos componentes.
- Carrossel com componente shadcn `carousel`; formulários e cards com shadcn.
- Dados das motos em um arquivo único de exemplo, fácil de substituir.
- Header preparado para receber o arquivo da logo assim que você enviar.
