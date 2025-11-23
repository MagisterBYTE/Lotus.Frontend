import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.ts', 'jest.config.ts'],
    plugins: {
      js
    },
    extends: ['js/recommended', importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      },
      parserOptions: {
        project: ['tsconfig.json']
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          // Используйте этот вариант если у вас есть tsconfig.json
          project: './tsconfig.json',
          // Или укажите конкретные пути
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      //=============================================================
      // БЕЗОПАСНОСТЬ И ПРЕДОТВРАЩЕНИЕ ОШИБОК
      //=============================================================
      // Запрещает условия которые всегда true/false (if(true) {...})
      'no-constant-condition': 'error',

      // Запрещает debugger statements в продакшене
      'no-debugger': 'error',

      // Запрещает дублирующиеся case в switch
      'no-duplicate-case': 'error',

      // Запрещает пустые блоки {} без комментариев
      'no-empty': 'error',

      // Запрещает лишние точки с запятой
      'no-extra-semi': 'error',

      // Запрещает "проваливание" через case в switch без break
      'no-fallthrough': 'error',

      // Запрещает var, требует let/const
      'no-var': 'error',

      // Предупреждает об использовании console.log, но разрешает console.warn/error
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      //=============================================================
      // СТИЛЬ КОДА И ФОРМАТИРОВАНИЕ
      //=============================================================
      // Форматирование строк - требует использование одинарных кавычек
      quotes: ['error', 'single'],

      // Отступы - 2 пробела, с особым правилом для switch-case
      indent: ['error', 2, { SwitchCase: 1 }],

      // Стиль фигурных скобок - Allman (на новой строке), но разрешает однострочные блоки
      'brace-style': ['error', 'allman', { allowSingleLine: true }],

      // Запрещает пустые строки в начале и конце блоков
      'padded-blocks': ['error', { blocks: 'never' }],

      // Пробелы вокруг стрелки в стрелочных функциях: (a) => {}
      'arrow-spacing': 'error',

      // Пробелы внутри блоков: if (a) { return b; }
      'block-spacing': 'error',

      // Пробелы после запятых: [1, 2, 3]
      'comma-spacing': 'error',

      // Единообразные пробелы в объектах: { key: value }
      'key-spacing': 'error',

      // Пробелы вокруг ключевых слов: if (condition) {}
      'keyword-spacing': 'error',

      // Пробелы внутри фигурных скобок: { key: value }
      'object-curly-spacing': ['error', 'always'],

      // Требует точки с запятой в конце выражений
      semi: ['error', 'always'],

      // Пробелы вокруг точек с запятой
      'semi-spacing': 'error',

      // Пробелы перед блоками: function test() { ... }
      'space-before-blocks': 'error',

      // Пробелы перед скобками функций:
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always', // function () {}
          named: 'never', // function name() {}
          asyncArrow: 'always' // async () => {}
        }
      ],

      // Пробелы внутри скобок: function( a, b )
      'space-in-parens': 'off',

      // Пробелы вокруг операторов: a + b вместо a+b
      'space-infix-ops': 'off',

      // Пробелы вокруг унарных операторов: typeof x, void 0
      'space-unary-ops': 'error',

      // Требует пробелы после комментариев // и /*, разрешает триггерные комментарии с ///
      'spaced-comment': ['error', 'always', { markers: ['/'] }],

      // Предупреждает если файл превышает 1200 строк (сложность поддержки)
      'max-lines': ['warn', { max: 1200 }],

      // Ограничивает длину строки 170 символов, игнорирует комментарии
      'max-len': ['error', { code: 170, tabWidth: 2, ignoreComments: true }],

      // Запрещает висящие запятые в объектах и массивах
      'comma-dangle': ['warn', 'never'],

      // Для консистентности именования (опционально)
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase']
        }
      ],

      //=============================================================
      // СОВРЕМЕННЫЙ JAVASCRIPT/TYPESCRIPT
      //=============================================================
      // Предпочитать стрелочные функции для колбэков
      'prefer-arrow-callback': 'error',

      // Предпочитать шаблонные строки вместо конкатенации
      'prefer-template': 'error',

      // Пробелы внутри ${} в шаблонных строках
      'template-curly-spacing': 'error',

      // Отключаем базовое правило, т.к. TypeScript вариант лучше
      'no-useless-constructor': 'off',

      // Запрещает пустые конструкторы
      '@typescript-eslint/no-useless-constructor': 'warn',

      // Требует использовать const вместо let для переменных, которые не переопределяются
      'prefer-const': 'error',

      // Запрещает объявления функций внутри блоков (if, for и т.д.)
      'no-inner-declarations': 'error',

      // Отключает проверку неиспользуемых переменных (обычно эту проверку делегируют TypeScript)
      'no-unused-vars': 'off',

      // Показывает ошибку для неиспользуемых переменных, но игнорирует переменные, начинающиеся с _
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // игнорирует _arg, __arg и т.д.
          varsIgnorePattern: '^_' // игнорирует _variable, __variable
        }
      ],

      // Требует явно указывать возвращаемый тип функций - отключено для гибкости
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Требует типы для экспортируемых функций - отключено
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Предупреждает об использовании any (слабая типизация)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Запрещает лишние утверждения типов когда TypeScript и так знает тип
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Предпочитать 'as const' вместо других способов утверждения для литералов
      '@typescript-eslint/prefer-as-const': 'error',

      // Запрещает "плавающие" промисы (промисы без обработки ошибок)
      '@typescript-eslint/no-floating-promises': 'error',

      // Запрещает await на не-промисах
      '@typescript-eslint/await-thenable': 'error',

      // Запрещает неправильное использование промисов (например, промис в if)
      '@typescript-eslint/no-misused-promises': 'error',

      //=============================================================
      // АСИНХРОННЫЙ КОД
      //=============================================================
      // Запрещает return await, т.к. это избыточно (TypeScript-специфичное правило)
      '@typescript-eslint/return-await': 'error',

      // Запрещает async функции без await
      'require-await': 'error',

      //=============================================================
      // КОНТРОЛЬ СЛОЖНОСТИ КОДА
      //=============================================================
      // Ограничивает цикломатическую сложность функции (max 20)
      complexity: ['warn', 20],

      // Максимум 4 параметра в функции
      'max-params': ['warn', 4],

      // Максимум 4 уровня вложенности блоков
      'max-depth': ['warn', 4],

      // Максимум 3 уровня вложенности колбэков
      'max-nested-callbacks': ['warn', 3],

      //=============================================================
      // ОРГАНИЗАЦИЯ ИМПОРТОВ
      //=============================================================
      // Сортировка и группировка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node built-in модули
            'external', // npm пакеты
            'internal', // внутренние модули
            'parent', // ../ imports
            'sibling', // ./ imports
            'index' // index файлы
          ],
          'newlines-between': 'never', // пустые строки между группами
          alphabetize: { order: 'asc' } // сортировка по алфавиту
        }
      ],

      // Запрещает дублирующиеся импорты из одного файла
      'import/no-duplicates': 'error',

      // Запрещает лишние сегменты в путях: ./../file вместо ../file
      'import/no-useless-path-segments': 'error'
    }
  },
  tseslint.configs.recommended
]);
