import { FilterFunctionDescriptors, IPropertyDescriptor, PropertyTypeDescriptors, ObjectInfo, ValidationResult } from 'lotus-core';
import { OptionsStory } from './OptionsStory';

export interface IPerson
{
  id: string;
  icon?: string;
  name: string;
  surname: string;
  roleId: number;
}

export class PersonInfoBase extends ObjectInfo
{
  private static _personInfoBase: PersonInfoBase;

  public static get Instance(): PersonInfoBase 
  {
    return (this._personInfoBase || (this._personInfoBase = new this()));
  }

  constructor() 
  {
    super();
    this.Init();
  }

  private Init()
  {
    const idProp: IPropertyDescriptor =
    {
      fieldName: 'id',
      name: 'Id',
      desc: 'Идентификатор пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const nameProp: IPropertyDescriptor =
    {
      fieldName: 'name',
      name: 'Имя',
      desc: 'Имя пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPerson | null) =>
        {
          const v: ValidationResult = new ValidationResult();
          if (item && item.name === '')
          {
            v.addErrorCustom('nameEmpty', true, 'Имя не может быть пустым')
          }
          if (item && item.name.length > 20)
          {
            v.addErrorCustom('nameLength', true, 'Имя не может быть больше 20 символов')
          }
          return v;
        }
      },
      filtering:
      {
        functionDefaultDesc: FilterFunctionDescriptors.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(nameProp);

    const surnameProp: IPropertyDescriptor =
    {
      fieldName: 'surname',
      name: 'Фамилия',
      desc: 'Фамилия пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPerson | null) =>
        {
          const v: ValidationResult = new ValidationResult();
          if (item && item.surname === '')
          {
            v.addErrorCustom('nameEmpty', true, 'Фамилия не может быть пустая')
          }
          if (item && item.surname.length > 20)
          {
            v.addErrorCustom('nameLength', true, 'Фамилия не может быть больше 40 символов')
          }
          return v;
        }
      },
      filtering:
      {
        functionDefaultDesc: FilterFunctionDescriptors.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(surnameProp);

    const roleIdProp: IPropertyDescriptor =
    {
      fieldName: 'roleId',
      name: 'Роль',
      desc: 'Роль пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.Integer,
      isArray: true,
      options: OptionsStory.TextRoles,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'select',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onValidation: (_: IPerson | null) => { return ValidationResult.Success }
      },
      filtering:
      {
        functionDefaultDesc: FilterFunctionDescriptors.IncludeAny,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(roleIdProp);
  }
}