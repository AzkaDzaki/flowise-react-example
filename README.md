# Agentlab Chatbot

A Flowise chatbot playground built with React, Tailwind CSS, shadcn/ui, and the `@ai-platform/flowise-embed-react` package.

## Run the project

1. Create a `.env` file in the project root:

```env
VITE_CHATFLOWID=26d64e29-3a3f-4da2-97a0-637ba55b62b5
VITE_API_HOST=https://adp-537046-stage.1ai.my.id
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown by Vite (usually http://localhost:5173).

## Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start dev server              |
| `npm run build`     | Type-check + production build |
| `npm run preview`   | Preview production build      |
| `npm run lint`      | Run ESLint                    |
| `npm run test`      | Run tests once                |
| `npm run typecheck` | TypeScript check              |

## Project structure

```
src/
├── app/          # Router, providers, root component
├── components/   # shadcn/ui primitives + shared composed components
├── hooks/        # Custom hooks (useFlowiseConfig)
├── lib/          # queryClient, flowiseDefaults
├── pages/        # Route-level components (Home, FullPageChat, BubbleChat)
├── store/        # Zustand stores (UI, Flowise config)
├── types/        # Flowise theme types
└── utils/        # cn() utility
```

## Demo

Try the included demo prompts:

- `prompt-html.md` — HTML artifact demo
- `prompt-mermaid.md` — Mermaid diagram demo

Paste their contents into the chatbot input to see the demos in action.
