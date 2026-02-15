/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRecordObject } from 'lotus-core/types';
import { ChangeEvent } from 'react';

export function useForm<TContent extends IRecordObject>(defaultValues: TContent)
{
  (handler: (content: TContent) => void | Promise<void>) =>
    async (event: ChangeEvent<HTMLFormElement>) => 
    {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      // Используем HTMLFormControlElement для поддержки select и textarea
      const elements = Array.from(form.elements) as HTMLInputElement[];
  
      const data = elements
        .filter((element) => element.hasAttribute('name'))
        .reduce(
          (object, element) => 
          {
            const { name, type, value, checked } = element;
        
            let finalValue: any = value;

            // Логика обработки разных типов инпутов
            if (type === 'checkbox') 
            {
              finalValue = checked;
            }
            else if (type === 'number' || type === 'range') 
            {
              finalValue = Number(value);
            }
            else if (type === 'radio' && !checked) 
            {
              // Если радиокнопка не выбрана, не перезаписываем значение
              return object;
            }

            return {
              ...object,
              [name]: finalValue
            };
          },
          { ...defaultValues } // Клонируем дефолтные значения
        );

      await handler(data);
      form.reset();
    };
}