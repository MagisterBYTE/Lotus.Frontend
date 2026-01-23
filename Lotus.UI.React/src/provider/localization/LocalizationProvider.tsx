import { createLanguageChangeEvent, LocalizationHelper, type TLanguageType } from 'lotus-core/localization';
import { useEffect, useState } from 'react';
import { LocalizationContext } from './LocalizationContext';

export interface ILocalizationProviderProps
{
  /**
   * Ключ для сохранения/загрузки данных подсистемы локализации
   */
  keySave?: string;

  /**
   * Дочерние элементы
   */
  children: React.ReactNode;
}

export const LocalizationProvider = (props: ILocalizationProviderProps) => 
{
  const { keySave, children } = props;
  const [languageType, setLanguageType] = useState<TLanguageType>(LocalizationHelper.loadFromStorage(keySave) ?? 'ru-RU');
  const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления

  useEffect(() => 
  {
    // Сохраняем язык в документ
    LocalizationHelper.setDocumentLang(languageType);

    // Сохраняем язык в локальное хранилище
    LocalizationHelper.saveToStorage(keySave, languageType);

    // Посылаем сообщение о смене языка
    const eventData = createLanguageChangeEvent(languageType);
    window.dispatchEvent(eventData);

    // Увеличиваем ключ для принудительного ререндера всех детей
    setProviderKey(prev => prev + 1);
  }, [languageType]);

  return (
    <LocalizationContext.Provider
      key={providerKey} 
      value={{
        languageType: languageType,
        setLanguageType: setLanguageType
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
