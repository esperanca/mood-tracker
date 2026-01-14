# Mood Tracker

## Descrição
App de rastreamento de humor com foco em privacidade. Dados armazenados localmente no navegador.

## Stack
- SvelteKit (JavaScript)
- Chart.js para gráficos
- localStorage para persistência
- Deploy: Vercel

## Comandos
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build

## Estrutura
- `/src/lib/components/` - Componentes reutilizáveis
- `/src/lib/stores/` - Stores Svelte (estado)
- `/src/lib/utils/` - Funções utilitárias
- `/src/routes/` - Páginas

## Convenções
- Mobile-first (responsivo)
- Dark theme obrigatório (#000 background)
- Touch targets mínimo 44px
- Emojis para feedback visual
- localStorage key: 'mood-tracker-data'

## Features Principais
1. Registro multi-step (grupos → humor → comentário → confirmar)
2. Dashboard pessoal com gráficos
3. Export JSON/CSV
4. Zero tracking, 100% local

## Arquivos Principais

### Stores
- `src/lib/stores/mood.js` - Store principal de humores (localStorage)

### Componentes
- `MoodSelector.svelte` - Seletor de emoji (😞 a 😊)
- `GroupSelector.svelte` - Multi-select de grupos (máx 3)
- `CommentInput.svelte` - Textarea opcional (500 chars)
- `MoodCard.svelte` - Card de registro individual
- `TrendChart.svelte` - Gráfico de tendência semanal
- `DistributionChart.svelte` - Gráfico de distribuição
- `BottomNav.svelte` - Navegação fixa inferior

### Rotas
- `/` - Home com fluxo multi-step de registro
- `/meus-humores` - Dashboard pessoal

## Estrutura de Dados

### Registro de Humor
```js
{
  id: string,           // crypto.randomUUID()
  mood: number,         // 1-5
  groups: string[],     // ['trabalho', 'familia']
  comment: string,      // opcional, max 500 chars
  timestamp: number     // Date.now()
}
```

### Grupos Disponíveis
trabalho, familia, amigos, academia, pets, saude, estudos, hobbies, relacionamento, financas, sono, geral

## Paleta de Cores
- Background: #000
- Text: #fff
- Mood 1 (😞): #e74c3c
- Mood 2 (😕): #e67e22
- Mood 3 (😐): #f1c40f
- Mood 4 (🙂): #27ae60
- Mood 5 (😊): #2ecc71
