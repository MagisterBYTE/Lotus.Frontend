# lotus-config

Общие **конфигурационные** файлы для frontend платформы Lotus: Oxlint, Oxfmt, TypeScript, Jest.

Пакет **не** содержит tooling-зависимостей — `typescript` / `jest` / `oxlint` ставятся в каждом пакете-потребителе.  
`Lotus.Config` только шарит пресеты через `extends` / `import`.

## Подключение

В `package.json` потребителя (в рамках npm workspaces):

```json
"devDependencies": {
  "lotus-config": "*"
}
```

или относительный путь: `"lotus-config": "file:../Lotus.Config"`.

## Oxlint

| Файл | Назначение |
|------|------------|
| `oxlint.base.jsonc` | TypeScript без React |
| `oxlint.react.jsonc` | React + jsx-a11y |

```jsonc
{
  "extends": ["../Lotus.Config/oxlint.base.jsonc"]
}
```

## Oxfmt

Локальный `.oxfmtrc.jsonc` по образцу `oxfmt.base.jsonc` (stable `extends` нет).

## TypeScript

```json
{
  "extends": "../Lotus.Config/tsconfig.library.json",
  "compilerOptions": {
    "rootDirs": ["src"],
    "outDir": "./dist/esm",
    "rootDir": "./src",
    "types": ["jest", "node"]
  },
  "include": ["src/**/*.ts"]
}
```

## Jest

Единый пресет: `jest.library.ts` (JSDoc по каждой опции).  
Для типов `Config` у `lotus-config` указан optional peer `jest` (>=29).

```ts
import shared from '../Lotus.Config/jest.library.ts';
// или: import shared from 'lotus-config/jest.library';

export default { ...shared };
```
