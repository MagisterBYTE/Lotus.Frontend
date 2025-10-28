/**
 * Интерфейс для определения обязательного отношения 'владелец' 
 */
export interface IHasRequiredOwner<TType>
{
  /**
   * Владелец
   */
  owner: TType;
}
