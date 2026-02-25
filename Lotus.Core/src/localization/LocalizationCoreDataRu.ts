export const LocalizationCoreDataRu =
{
  api:
  {
    errorNotOnline: 'Не удалось отправить запрос. Проверьте доступ в Интернет',
    errorNotFound: 'Не удалось найти указанный адрес {0}, проверьте доступность сервера и корректность адреса',
    errorTimeoutError: 'Не удалось отправить запрос. Запрос прерван по таймауту',
    errorAuth: 'Пользователь не авторизован',
    auth:
    {
      invalid_request: 'Запрос является некорректным (например, отсутствует обязательный параметр или параметр имеет недопустимое значение)',
      unauthorized_client: 'Клиент не авторизован запрашивать авторизационный код данным методом',
      access_denied: 'Владелец ресурса или сервер авторизации отклонил запрос',
      unsupported_response_type: 'Сервер авторизации не поддерживает получение авторизационного кода с использованием данного метода (response_type)',
      invalid_scope: 'Запрошенная область действия является недопустимой, неизвестной или имеет некорректный формат',
      server_error: 'Сервер авторизации столкнулся с непредвиденной ошибкой, которая не позволяет ему выполнить запрос',
      temporarily_unavailable: 'Сервер авторизации временно недоступен из-за перегрузки или технического обслуживания'
    }
  },
  common:
  {
    name: 'Наименование',
    displayName: 'Отображаемое наименование',
    failed: 'Ошибка',
    succeed: 'Успешно'
  },
  controls:
  {
    grid: 'Сетка',
    rotation: 'Поворот',
    scale: 'Масштаб',
    border: 'Граница',
    cornerRounding: 'Скругление',
    transparentBackground: 'Прозрачный фон',
    smoothingEdges: 'Сглаживание краев',
    increaseFont: 'Увеличь шрифта',
    decreaseFont: 'Уменьшить шрифта',
    viewTable: 'Вид таблицы',
    viewCard: 'Вид карточек',
    filters: 'Фильтры',
    filterFunction: 'Функция фильтрации'
  },
  actions: {
    load: 'Загрузить',
    reset: 'Сбросить',
    get: 'Получить',
    getting: 'Получение...',
    gettingSucceed: 'Получение данных прошло успешно',
    gettingFailed: 'При получение данных произошла ошибка',
    create: 'Создать',
    createObject: 'Создать объекта {objectType}',
    add: 'Добавить',
    adding: 'Добавление...',
    addingSucceed: 'Добавление прошло успешно',
    addingFailed: 'При добавление произошла ошибка',
    edit: 'Редактировать',
    editObject: 'Редактирование объекта {objectName}',
    save: 'Сохранить',
    saving: 'Сохранение...',
    savingSucceed: 'Сохранение прошло успешно',
    savingFailed: 'При сохранении произошла ошибка',
    duplicate: 'Дублировать',
    delete: 'Удалить',
    deleting: 'Удаление...',
    deletingSucceed: 'Удаление прошло успешно',
    deletingFailed: 'При удаление произошла ошибка',
    deleteObject: 'Вы хотите удалить объект {objectName}. Это действие нельзя отменить',
    cancel: 'Отменить',
    clear: 'Отчистить',
    confirm: 'Подтверждаю',
    search: 'Поиск',
    resetAll: 'Сбросить все',
    apply: 'Применить'
  },
  filters:
  {
    equals: 'Равно',
    equalsAbbr: '=',
    notEqual: 'Не равно',
    notEqualAbbr: '!=',
    lessThan: 'Меньше',
    lessThanAbbr: '<',
    lessThanOrEqual: 'Меньше или равно',
    lessThanOrEqualAbbr: '<=',
    greaterThan: 'Больше',
    greaterThanAbbr: '>',
    greaterThanOrEqual: 'Больше или равно',
    greaterThanOrEqualAbbr: '>=',
    between: 'Между',
    betweenAbbr: '<>',
    contains: 'Содержит',
    startsWith: 'Начинается с',
    endsWith: 'Заканчивается на',
    like: 'Содержит',
    notEmpty: 'Не пустая',
    empty: 'Пустая',
    includeAny: 'Любой из элементов',
    includeAll: 'Все из элементов',
    includeEquals: 'Только эти элементы',
    includeNone: 'Ни один из элементов'
  },
  byteSize:
  {
    bytes: 'байт',
    Kb: 'КБ',
    Mb: 'МБ',
    Gb: 'ГБ'
  },
  validation:
  {
    invalidEmail: 'Некорректный email',
    invalidFormat: 'Некорректный формат',
    invalidPhone: 'Некорректный телефонный номер',
    invalidUrl: 'Некорректный адрес Url',
    required: 'Поле обязательно для ввода',
    positive: 'Значение поля должно быть больше нуля',
    negative: 'Значение поля должно быть меньше нуля',
    minNumber: (min: number) => `Значение поля не может быть меньше ${min}`,
    maxNumber: (min: number) => `Значение поля не может быть больше ${min}`,
    rangeNumber: (min: number, max: number) => `Значение поля должно быть в диапазоне от ${min} до ${max}`,
    minDate: (min: string) => `Значение поля не может быть меньше ${min}`,
    maxDate: (min: string) => `Значение поля не может быть больше ${min}`,
    rangeDate: (min: string, max: string) => `Значение поля должно быть в диапазоне от ${min} до ${max}`,
    maxString: (length: number) => `Длина поля не может превышать ${length} символов`,
    minString: (length: number) => `Длина поля не может быть меньше ${length} символов`,
    rangeString: (min: number, max: number) => `Значение поля должно быть в диапазоне от ${min} до ${max}`,
    minCount: (count: number) => `Количество элементов в массиве не может быть меньше ${count}`,
    maxCount: (count: number) => `Количество элементов в массиве не может быть больше ${count}`
  }
};
