/**
 * Стандартные типы команды действия
 */
export type TActionCommandType = 'default' | 'navigation' | 'delimiter';

/**
 * Класс для представления стандартных типов команды действия
 */
export abstract class ActionCommandTypes
{
  public static readonly Default:TActionCommandType = 'default';
  public static readonly Navigation:TActionCommandType = 'navigation';
  public static readonly Delimiter:TActionCommandType = 'delimiter';
}
