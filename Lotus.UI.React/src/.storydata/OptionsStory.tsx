import { IOption } from 'lotus-core';
import { FcAddressBook, FcCloth, FcFactoryBreakdown,  } from 'react-icons/fc';
import { IconsStory } from './IconsStory';
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { LiaGrinTongueSquint } from "react-icons/lia";
import { GiArrowed } from "react-icons/gi";


export abstract class OptionsStory
{
  public static readonly Text: IOption[] = [
    { label: 'Первый', value: 1 },
    { label: 'Второй', value: 2 },
    { label: 'Третий', value: 3 }
  ];

  public static readonly TextRoles: IOption<string>[] = [
    { value: '1', label: 'Админ',  icon: <RiAdminLine  /> },
    { value: '2', label: 'Модератор',  icon: <HiOutlineHomeModern  />  },
    { value: '3', label: 'Пользователь',  icon: <FaRegUser />  },
    { value: '4', label: 'Гость',  icon: <LiaGrinTongueSquint /> },
    { value: '5', label: 'Посетитель',  icon: <GiArrowed  />  }
  ];

  public static readonly PermissionNumber: IOption<number>[] = [
    { value: 1, label: 'View', icon: IconsStory.CurveArray64 },
    { value: 2, label: 'Edit', icon: IconsStory.HydraulicAnalysis64 },
    { value: 3, label: 'Remove', icon: IconsStory.CollapseAnalysis64 },
    { value: 4, label: 'Exec' },
    { value: 5, label: 'System' }
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
