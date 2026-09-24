import type { Config } from 'jest';

/**
 * Базовый Jest-пресет для frontend-библиотек Lotus (без React).
 * Пакеты-потребители расширяют через spread в своём `jest.config.ts`.
 *
 * Типы `Config` приходят из `peerDependencies.jest` (ставит пакет-потребитель / workspace).
 */
const config: Config = {
  /**
   * Сбрасывать состояние моков (вызовы, экземпляры, результаты) между тестами.
   * Уменьшает взаимное влияние тестов через общие mock-объекты.
   */
  clearMocks: true,

  /**
   * Собирать coverage при каждом запуске тестов.
   * Отключить точечно: `jest --coverage=false`.
   */
  collectCoverage: true,

  /**
   * Каталог для отчётов coverage (относительно корня пакета-потребителя).
   */
  coverageDirectory: 'coverage',

  /**
   * Провайдер инструментации coverage.
   * `v8` обычно быстрее классического `babel`/`istanbul`.
   */
  coverageProvider: 'v8',

  /**
   * Каталоги, в которых Jest ищет модули при резолве импортов.
   * `src` нужен для удобных относительных/коротких путей в библиотеках.
   */
  moduleDirectories: ['node_modules', 'src'],

  /**
   * Игнорировать артефакты сборки при поиске модулей и тестов.
   */
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  /**
   * Готовый пресет для TypeScript: трансформация через `ts-jest`.
   * Потребитель может переопределить `transform` при необходимости.
   */
  preset: 'ts-jest'
};

export default config;
