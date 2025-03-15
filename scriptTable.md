## Framework Template with Sample App: Dynamic AI-powered Dev Prompter
### Nebula Starter Template by Nebula-Singularity Team

| Script Name   | Command                                                                 | NPM Command             |
|---------------|-------------------------------------------------------------------------|-------------------------|
| `dev`         | `vite`                                                                 | `npm run dev`           |
| `build`       | `ts-node scripts/build.ts`                                             | `npm run build`         |
| `lint`        | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | `npm run lint`          |
| `preview`     | `vite preview`                                                         | `npm run preview`       |
| `test`        | `vitest run`                              | `npm run test`          |
| `test:unit`   | `ts-node scripts/test.ts unit`                                         | `npm run test:unit`     |
| `test:integration` | `ts-node scripts/test.ts integration`                               | `npm run test:integration` |
| `test:e2e`    | `ts-node scripts/test.ts e2e`                                          | `npm run test:e2e`      |
| `test:coverage` | `vitest run --coverage`                                                | `npm run test:coverage` |
| `typecheck`   | `tsc --noEmit`                                                         | `npm run typecheck`     |
| `prepare`     | `husky install`                                                        | `npm run prepare`       |
| `pre-push`    | `npm run typecheck && npm run lint && npm run test`                    | `npm run pre-push`      |
