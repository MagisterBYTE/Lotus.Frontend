import { keyframes } from '@emotion/css';
import { ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { IRecordObject } from 'lotus-core/types';
import { CSSProperties } from 'react';
import { TCssColor } from '#types';

// const HOVER_TRANSITION = 'transform 0.2s ease, box-shadow 0.2s ease, background-position 0.3s ease, border-color 0.2s ease';
// const HOVER_TRANSITION = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, background-position 0.4s ease';

// Константы для плавности
const HOVER_TRANSITION = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';


const HOVER_SHADOW = 'var(--mantine-shadow-sm)';
const WAVE_DURATION = '1.5s';

const waveAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

type TEffectProperties = CSSProperties | IRecordObject;

export abstract class InteractivityEffectHover
{

  /**
   * Вспомогательный метод для объединения стилей без перезаписи &:hover
   */
  static combine(...styles: TEffectProperties[]): TEffectProperties 
  {
    const merged: IRecordObject = { '&:hover': {} };

    styles.forEach((style: IRecordObject) => 
    {
      if (!style) return;
      
      Object.keys(style).forEach((key) => 
      {
        if (key === '&:hover') 
        {
          // Сливаем содержимое ховеров
          merged['&:hover'] = { ...merged['&:hover'], ...style['&:hover'] };
        }
        else 
        {
          // Обычные свойства (transition, transform и т.д.)
          merged[key] = style[key];
        }
      });
    });

    return merged;
  }

  /**
   * Эффект изменения прозрачности (Opacity)
   * @param value Значение прозрачности при наведении (0.8 = 80%)
   * @param target 'self' - весь элемент, 'background' - только фон (если поддерживается)
   */
  static getOpacity(value: number = 0.8, target: 'self' | 'background' = 'self'): TEffectProperties 
  {
    const styles: TEffectProperties = {
      transition: HOVER_TRANSITION
    };

    if (target === 'self') 
    {
      styles.opacity = 1;
      (styles as IRecordObject)['&:hover'] = {
        opacity: value
      };
    }
    else 
    {
      // Для фона используем фильтр, чтобы не затрагивать дочерний текст
      (styles as IRecordObject)['&:hover'] = {
        backdropFilter: `brightness(${value * 100}%)` 
      };
    }

    return styles;
  }

  /**
   * Эффект плавного масштабирования (Scale)
   * @param ratio Коэффициент увеличения (1.05 = +5%)
   */
  static getScale(ratio: number = 1.05): TEffectProperties 
  {
    return {
      transition: HOVER_TRANSITION,
      transform: 'scale(1)', // Исходное состояние для плавности в обе стороны
      // willChange: 'transform', // Подсказка браузеру для оптимизации анимации
      '&:hover': {
        transform: `scale(${ratio})`
      }
    };
  }

  /**
   * Эффект "Свечения" краев (Glow)
   * Создает внешнюю ауру в цвет акцента
   */
  public static getGlow(accentColor: TCssColor | TColorToken, intensity: 'soft' | 'strong' = 'soft'): TEffectProperties 
  {
    const color = ColorCssHelper.getColorWithAlpha(accentColor, intensity === 'soft' ? 0.3 : 0.6);
    const blur = intensity === 'soft' ? '8px' : '15px';
    const spread = intensity === 'soft' ? '0px' : '2px';

    return {
      transition: HOVER_TRANSITION,
      '&:hover': {
        boxShadow: `0 0 ${blur} ${spread} ${color}`,
        borderColor: ColorCssHelper.getColorWithAlpha(accentColor, 0.8)
      }
    };
  }

  /**
   * Эффект легкого приподнятия с тенью
   */
  static getLift(shadow = HOVER_SHADOW): TEffectProperties 
  {
    return {
      transition: HOVER_TRANSITION,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: shadow
      }
    };
  }

  /**
   * Эффект "волны" (перелива) по фону
   */
  static getWave(accentColor: TCssColor | TColorToken): TEffectProperties 
  {
    const waveGradient = `linear-gradient(90deg, transparent, ${ColorCssHelper.getColorWithAlpha(accentColor, 0.2)}, transparent)`;
    
    return {
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `${waveGradient}, none`,
      backgroundSize: '200% 100%, auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '200% 0, 0 0',
      transition: HOVER_TRANSITION,
      '&:hover': {
        animation: `${waveAnimation} ${WAVE_DURATION} infinite linear`
      }
    };
  }

  /**
   * Максимальный интерактив: Подъем + Волна + Свечение
   */
  static getFullInteraction(accentColor: TCssColor | TColorToken): TEffectProperties 
  {
    return this.combine(
      this.getLift(),
      this.getWave(accentColor),
      this.getGlow(accentColor, 'soft')
    );
  }

  /**
   * Элегантный эффект для интерактивных элементов: 
   * Легкое масштабирование + затухание прозрачности
   */
  static getFadedScale(ratio: number = 1.1, opacity: number = 0.7): TEffectProperties 
  {
    return this.combine(
      this.getScale(ratio),
      this.getOpacity(opacity)
    );
  }
}