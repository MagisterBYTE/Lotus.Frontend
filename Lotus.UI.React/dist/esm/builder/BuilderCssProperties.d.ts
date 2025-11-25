import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { TCssProperties } from '#types';
/**
 * Абстрактный класс, предоставляющий методы для построения и заполнения CSS-свойств
 * на основе переданных пропсов. Предназначен для централизованного управления
 * стилями компонентов в React-приложении.
 */
export declare abstract class BuilderCssProperties {
    /**
     * Заполняет переданный объект стилей CSS-свойствами, связанными с контейнером.
     * Включает padding, margin, border, box-shadow и другие визуальные свойства.
     *
     * @param style - Объект CSS-свойств, который будет изменён (мутация).
     * @param props - Интерфейс с общими свойствами контейнера.
     * @param override - Флаг, определяющий, следует ли перезаписывать существующие свойства.
     * @returns Изменённый объект стилей (тот же экземпляр, что и `style`).
     */
    static fillContainer(style: TCssProperties, props: IGeneralContainerProperties, override: boolean): TCssProperties;
    /**
     * Создаёт новый объект CSS-свойств на основе переданных пропсов контейнера.
     * В отличие от `fillContainer`, не изменяет переданный объект, а возвращает новый.
     *
     * @param props - Интерфейс с общими свойствами контейнера.
     * @returns Новый объект CSS-свойств.
     */
    static buildContainer(props: IGeneralContainerProperties): TCssProperties;
    /**
     * Заполняет переданный объект стилей CSS-свойствами, связанными с фоном.
     * Включает background, box-shadow и другие фоновые свойства.
     *
     * @param style - Объект CSS-свойств, который будет изменён (мутация).
     * @param props - Интерфейс с общими свойствами фона.
     * @param override - Флаг, определяющий, следует ли перезаписывать существующие свойства.
     * @returns Изменённый объект стилей (тот же экземпляр, что и `style`).
     */
    static fillBackground(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties;
    /**
     * Создаёт новый объект CSS-свойств, содержащий только фоновые свойства.
     * Возвращает новый объект без мутаций входных данных.
     *
     * @param props - Интерфейс с общими свойствами фона.
     * @returns Новый объект CSS-свойств, содержащий background и box-shadow.
     */
    static buildBackground(props: IGeneralBackgroundProperties): TCssProperties;
}
//# sourceMappingURL=BuilderCssProperties.d.ts.map