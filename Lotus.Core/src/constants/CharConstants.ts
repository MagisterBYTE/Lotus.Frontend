export abstract class CharConstants
{
  /**
   * Неразрывный пробел (По ширине совпадает с межсловным пробелом.)
   * Мнемоника в HTML 4 - &nbsp;
   */
  public static readonly NonBreakingSpace: string = '\u00A0' as const;

  /**
   * Фигурный пробел (Имеет такую же ширину, что и цифры в данном шрифте, и предназначен для набора таблиц.)
   * Мнемоника в HTML 4 - &#x2007; или &#8199;
   */
  public static readonly FigureSpace: string = '\u2007' as const;

  /**
   * Узкий неразрывный пробел.
   * Мнемоника в HTML 4 - &#x202F; или &#8239;
   */
  public static readonly NarrowNoBreakSpace: string = '\u202F' as const;

  /**
   * Неразрывный пробел с нулевой шириной.
   * Мнемоника в HTML 4 - &#x2060; или &#8288;
   */
  public static readonly WordJoiner: string = '\u2060' as const;

  // ========== Пробельные символы ==========
  /**
   * Обычный пробел
   */
  public static readonly Space: string = ' ' as const;

  /**
   * Табуляция
   */
  public static readonly Tab: string = '\t' as const;

  /**
   * Перевод строки (LF - Line Feed)
   */
  public static readonly LineFeed: string = '\n' as const;

  /**
   * Возврат каретки (CR - Carriage Return)
   */
  public static readonly CarriageReturn: string = '\r' as const;

  // ========== Знаки препинания ==========
  /**
   * Точка
   */
  public static readonly Period: string = '.' as const;

  /**
   * Запятая
   */
  public static readonly Comma: string = ',' as const;

  /**
   * Точка с запятой
   */
  public static readonly Semicolon: string = ';' as const;

  /**
   * Двоеточие
   */
  public static readonly Colon: string = ':' as const;

  /**
   * Восклицательный знак
   */
  public static readonly ExclamationMark: string = '!' as const;

  /**
   * Вопросительный знак
   */
  public static readonly QuestionMark: string = '?' as const;

  // ========== Кавычки ==========
  /**
   * Одинарная кавычка
   */
  public static readonly SingleQuote: string = '\'' as const;

  /**
   * Двойная кавычка
   */
  public static readonly DoubleQuote: string = '"' as const;

  /**
   * Обратная одинарная кавычка
   */
  public static readonly Backtick: string = '`' as const;

  // ========== Скобки ==========
  /**
   * Открывающая круглая скобка
   */
  public static readonly LeftParenthesis: string = '(' as const;

  /**
   * Закрывающая круглая скобка
   */
  public static readonly RightParenthesis: string = ')' as const;

  /**
   * Открывающая квадратная скобка
   */
  public static readonly LeftSquareBracket: string = '[' as const;

  /**
   * Закрывающая квадратная скобка
   */
  public static readonly RightSquareBracket: string = ']' as const;

  /**
   * Открывающая фигурная скобка
   */
  public static readonly LeftCurlyBrace: string = '{' as const;

  /**
   * Закрывающая фигурная скобка
   */
  public static readonly RightCurlyBrace: string = '}' as const;

  /**
   * Открывающая угловая скобка
   */
  public static readonly LeftAngleBracket: string = '<' as const;

  /**
   * Закрывающая угловая скобка
   */
  public static readonly RightAngleBracket: string = '>' as const;

  // ========== Математические операторы ==========
  /**
   * Плюс
   */
  public static readonly Plus: string = '+' as const;

  /**
   * Минус
   */
  public static readonly Minus: string = '-' as const;

  /**
   * Знак равенства
   */
  public static readonly Equals: string = '=' as const;

  /**
   * Звездочка (умножение)
   */
  public static readonly Asterisk: string = '*' as const;

  /**
   * Слэш (деление)
   */
  public static readonly Slash: string = '/' as const;

  /**
   * Обратный слэш
   */
  public static readonly Backslash: string = '\\' as const;

  /**
   * Процент
   */
  public static readonly Percent: string = '%' as const;

  // ========== Разделители ==========
  /**
   * Вертикальная черта (pipe)
   */
  public static readonly Pipe: string = '|' as const;

  /**
   * Амперсанд
   */
  public static readonly Ampersand: string = '&' as const;

  /**
   * Решетка (hash)
   */
  public static readonly Hash: string = '#' as const;

  /**
   * Подчеркивание
   */
  public static readonly Underscore: string = '_' as const;

  /**
   * Тире
   */
  public static readonly Hyphen: string = '-' as const;

  /**
   * Тильда
   */
  public static readonly Tilde: string = '~' as const;

  /**
   * Циркумфлекс
   */
  public static readonly Caret: string = '^' as const;

  /**
   * Доллар
   */
  public static readonly Dollar: string = '$' as const;

  /**
   * At-символ
   */
  public static readonly At: string = '@' as const;

  // ========== Специальные символы ==========
  /**
   * Ноль (символ)
   */
  public static readonly Zero: string = '0' as const;
}
