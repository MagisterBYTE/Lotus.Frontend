export function useForm(defaultValues) {
    (handler) => async (event) => {
        event.preventDefault();
        const form = event.target;
        // Используем HTMLFormControlElement для поддержки select и textarea
        const elements = Array.from(form.elements);
        const data = elements
            .filter((element) => element.hasAttribute('name'))
            .reduce((object, element) => {
            const { name, type, value, checked } = element;
            let finalValue = value;
            // Логика обработки разных типов инпутов
            if (type === 'checkbox') {
                finalValue = checked;
            }
            else if (type === 'number' || type === 'range') {
                finalValue = Number(value);
            }
            else if (type === 'radio' && !checked) {
                // Если радиокнопка не выбрана, не перезаписываем значение
                return object;
            }
            return {
                ...object,
                [name]: finalValue
            };
        }, { ...defaultValues } // Клонируем дефолтные значения
        );
        await handler(data);
        form.reset();
    };
}
//# sourceMappingURL=useForm.js.map