Модуль Core для Frontend приложений платформы Lotus

# Создание шаблона модуля
* Установка TypeScript `npm install -D typescript`
  + Настройка tsconfig.json
    - **moduleResolution**: "bundler"   // Для поддержки Node.js Subpath Imports 
    - **outDir**: "./dist/esm"          // Путь для скомпилированных файлов
    - **rootDirs**: ["src"]              // Путь до исходных файлов
    - **include**: ["src/**/*.ts"]      // Включаем все файлы

* Установка Eslint `npm init @eslint/config@latest`
  + Установка плагина Eslint(eslint-plugin-import) `npm install eslint-plugin-import --save-dev`
  + Копирование файла настроек `eslint.config.js`
* Установка Prettier `npm install --save-dev --save-exact prettier`
* Установка Jest `npm install --save-dev jest` // Основная библиотека для тестирования.
  + Установка Jest Types `npm install --save-dev @types/jest` // Типы для Jest, чтобы TypeScript мог корректно работать с Jest.
  + Установка ts-node  `npm install --save-dev ts-node`       // Позволяет запускать TypeScript-файлы напрямую.
  + Установка ts-jest `npm install --save-dev ts-jest`        // Плагин для Jest, который позволяет тестировать TypeScript-код.
  + Команда для создания файла конфигурации `npx ts-jest config:init` или копирование файла настроек `jest.config.ts`