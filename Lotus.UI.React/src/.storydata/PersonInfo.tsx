import
  {
    FilterFunctionDescriptors,
    IPropertyDescriptor,
    PropertyTypeDescriptors,
    ObjectInfo,
    INameable,
    IEditable,
    IOption,
    BaseValidator,
    ItemsHelper
  } from 'lotus-core';
import { OptionsStory } from './OptionsStory';
import { Box, HorizontalStack } from '#components/Layout';
import { RenderOption } from '#render';
import { IContextRenderBase, TSizeTypes, TSizeTypeValues } from '#types';
import { Text } from '#components/Display';

export interface IPerson extends INameable, IEditable
{
  id: string;
  avatar: string;
  icon?: string;
  name: string;
  surname: string;
  roleId: number;
  tagsIds: number[];
  birthday: string;
  age: number;
  power?: number;
}

export class PersonValidator extends BaseValidator
{
  private static _personValidator: PersonValidator;

  public static get Instance(): PersonValidator
  {
    return this._personValidator || (this._personValidator = new this());
  }

  // #region IValidator
  public override validate(obj: IPerson): boolean
  {
    this.validationStatus.clear();
    this.validationStatus.addErrorRequired('name', obj.name);
    this.validationStatus.addErrorMaxString('name', obj.name, 20);
    this.validationStatus.addErrorRequired('surname', obj.surname);
    this.validationStatus.addErrorMaxString('surname', obj.surname, 60);
    this.validationStatus.addErrorRequired('roleId', obj.roleId);
    this.validationStatus.addErrorRequiredArray('tagsIds', obj.tagsIds);
    return this.validationStatus.isValid();
  }
  // #endregion
}

export class PersonInfoBase extends ObjectInfo
{
  private static _personInfoBase: PersonInfoBase;

  public static get Instance(): PersonInfoBase
  {
    return this._personInfoBase || (this._personInfoBase = new this());
  }

  constructor()
  {
    super();
    this.Init();
    this.objectName = 'Персонаж';
  }

  private Init()
  {
    const idProp: IPropertyDescriptor = {
      fieldName: 'id',
      name: 'Id',
      desc: 'Идентификатор пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.Int,
      sorting: {
        enabled: true
      },
      visualSettings: {
        size: 30
      }
    };

    this.descriptors.push(idProp);

    const avatarProp: IPropertyDescriptor = {
      fieldName: 'avatar',
      name: 'Avatar',
      desc: 'Аватар пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.String,
      isArray: false,
      isNullable: true,
      rendering: {
        enabled: true,
        renderField: (item: unknown, context?: unknown) =>
        {
          const person = item as IPerson;
          const renderContext = context as IContextRenderBase;
          // {`https://i.pravatar.cc/64/${person.id}`}
          return (
            <>
              <img src={person.avatar} referrerPolicy="no-referrer" width={64} height={64} alt="it's me" />
            </>
          );
        }
      },
      visualSettings: {
        size: 50
      }
    };

    this.descriptors.push(avatarProp);

    const nameProp: IPropertyDescriptor = {
      fieldName: 'name',
      name: 'Имя',
      desc: 'Имя пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.String,
      editing: {
        enabled: true,
        required: true,
        editorType: 'text'
      },
      filtering: {
        functionDefaultDesc: FilterFunctionDescriptors.Contains,
        enabled: true
      },
      sorting: {
        enabled: true
      }
    };

    this.descriptors.push(nameProp);

    const surnameProp: IPropertyDescriptor = {
      fieldName: 'surname',
      name: 'Фамилия',
      desc: 'Фамилия пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.String,
      editing: {
        enabled: true,
        required: true,
        editorType: 'text'
      },
      filtering: {
        functionDefaultDesc: FilterFunctionDescriptors.Contains,
        enabled: true
      },
      sorting: {
        enabled: true
      },
      rendering: {
        enabled: true,
        renderField: (item: unknown, context?: unknown) =>
        {
          const person = item as IPerson;
          const renderContext = context as IContextRenderBase;
          return <Text fontSize={renderContext?.size}>{person.surname}</Text>;
        }
      }
    };

    this.descriptors.push(surnameProp);

    const roleIdProp: IPropertyDescriptor = {
      fieldName: 'roleId',
      name: 'Роль',
      desc: 'Роль пользователя',
      propertyTypeDesc: PropertyTypeDescriptors.Int,
      isArray: false,
      possibleValues: OptionsStory.TextRoles,
      editing: {
        enabled: true,
        required: true,
        editorType: 'select'
      },
      filtering: {
        variant: 'multi-select',
        functionDefaultDesc: FilterFunctionDescriptors.IncludeAny,
        enabled: true
      },
      sorting: {
        enabled: true
      },
      rendering: {
        enabled: false,
        renderField: (item: unknown, context?: unknown) =>
        {
          const role = item as IOption<string>;
          const renderContext = context as IContextRenderBase;
          return (
            <>
              <Text fontSize={renderContext?.size}>{role.label}</Text>
              <i>{`[${role.value}]`}</i>
            </>
          );
        }
      },
      visualSettings:
      {
        propsEdit:
        {
          renderValue: true,
          renderItem: true,
        }
      }
    };

    this.descriptors.push(roleIdProp);

    const tagsIdProp: IPropertyDescriptor = {
      fieldName: 'tagsIds',
      name: 'Теги',
      desc: 'Теги',
      propertyTypeDesc: PropertyTypeDescriptors.Int,
      isArray: true,
      possibleValues: OptionsStory.PermissionNumber,
      editing: {
        enabled: true,
        required: true,
        editorType: 'multi-select'
      },
      filtering: {
        variant: 'multi-select',
        functionDefaultDesc: FilterFunctionDescriptors.IncludeAny,
        enabled: true
      },
      sorting: {
        enabled: true
      },
      rendering: {
        enabled: false,
        renderField: (item: unknown, context?: unknown) =>
        {
          const person = item as IPerson;
          const options = ItemsHelper.getItemsByValues(OptionsStory.PermissionNumber, person.tagsIds);
          const renderContext = context as IContextRenderBase;
          const size = renderContext.size ?? 'md';
          return (
            <HorizontalStack spacing={'md'} wrap>
              {options.map((x) =>
              {
                return RenderOption.renderOption(size, x, context, undefined, {withBorder:true, bdRadius:size, p:TSizeTypes.prev(size, 2)})
              })}
            </HorizontalStack>
          );
        }
      },
      visualSettings:
      {
        propsEdit:
        {
          renderValue: true,
          renderItem: true,
        }
      }
    };

    this.descriptors.push(tagsIdProp);
  }
}
