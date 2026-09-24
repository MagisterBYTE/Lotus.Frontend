import type { Config } from 'jest';
import shared from 'lotus-config/jest.library.ts';

/**
 * Jest для Lotus.Core — базовые настройки из lotus-config.
 */
const config: Config = { ...shared };

export default config;
