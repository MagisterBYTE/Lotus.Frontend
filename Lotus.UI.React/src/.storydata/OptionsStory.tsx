import { IOption } from 'lotus-core';
import React from 'react';
import { FcAddressBook, FcCloth, FcFactoryBreakdown } from 'react-icons/fc';
import { IconsStory } from './IconsStory';

export abstract class OptionsStory
{
  public static readonly Text: IOption[] = [
    { label: 'Первый', value: 1 },
    { label: 'Второй', value: 2 },
    { label: 'Третий', value: 3 }
  ];

  public static readonly TextRoles: IOption<string>[] = [
    { value: '1', label: 'Админ' },
    { value: '2', label: 'Модератор' },
    { value: '3', label: 'Пользователь' }
  ];

  public static readonly IconReact: IOption[] = [
    { label: '', value: 1, icon: <FcAddressBook /> },
    { label: '', value: 2, icon: <FcCloth /> },
    { label: '', value: 3, icon: <FcFactoryBreakdown /> }
  ];

  public static readonly IconImage: IOption[] = [
    { label: '', value: 1, icon: IconsStory.CurveArray64 },
    { label: '', value: 2, icon: IconsStory.HydraulicAnalysis64 },
    { label: '', value: 3, icon: IconsStory.CollapseAnalysis64 }
  ];

  public static readonly TextAndIconReact: IOption<string>[] = [
    { label: 'Первый', value: '1', icon: <FcAddressBook /> },
    { label: 'Второй', value: '2', icon: <FcCloth /> },
    { label: 'Третий', value: '3', icon: <FcFactoryBreakdown /> }
  ];

  public static readonly TextAndIconImage: IOption<string>[] = [
    { label: 'Массив кривых', value: '1', icon: IconsStory.CurveArray64 },
    { label: 'Анализ гидроразрыва', value: '2', icon: IconsStory.HydraulicAnalysis64 },
    { label: 'Анализ обрушения', value: '3', icon: IconsStory.CollapseAnalysis64 }
  ];
}
