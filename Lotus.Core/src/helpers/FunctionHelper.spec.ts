import { FunctionHelper } from './FunctionHelper';

describe('FunctionHelper', () => 
{
  describe('bindAllMethods', () => 
  {
    it('should bind all methods to class instance', () => 
    {
      class TestClass 
      {
        value = 42;

        constructor() 
        {
          FunctionHelper.bindAllMethods(this);
        }

        getValue() 
        {
          return this.value;
        }

        getValueArrow = () => 
        {
          return this.value;
        };
      }

      const instance = new TestClass();
      const { getValue, getValueArrow } = instance;

      // Проверяем обычный метод
      expect(getValue()).toBe(42);
      
      // Проверяем стрелочную функцию (она уже привязана)
      expect(getValueArrow()).toBe(42);
    });

    it('should not bind getters/setters', () => 
    {
      class TestClass 
      {
        private _value = 100;

        constructor() 
        {
          FunctionHelper.bindAllMethods(this);
        }

        get value() 
        {
          return this._value;
        }

        set value(v: number) 
        {
          this._value = v;
        }
      }

      const instance = new TestClass();
      expect(instance.value).toBe(100);
      instance.value = 200;
      expect(instance.value).toBe(200);
    });

    it('should work with inheritance', () => 
    {
      class ParentClass 
      {
        parentValue = 'parent';

        constructor() 
        {
          FunctionHelper.bindAllMethods(this);
        }

        getParentValue() 
        {
          return this.parentValue;
        }
      }

      class ChildClass extends ParentClass 
      {
        childValue = 'child';

        getChildValue() 
        {
          return this.childValue;
        }
      }

      const instance = new ChildClass();
      const { getParentValue, getChildValue } = instance;

      expect(getParentValue()).toBe('parent');
      expect(getChildValue()).toBe('child');
    });

    it('should not bind properties that are not functions', () => 
    {
      class TestClass 
      {
        numberValue = 123;
        stringValue = 'test';

        constructor() 
        {
          FunctionHelper.bindAllMethods(this);
        }
      }

      const instance = new TestClass();
      expect(instance.numberValue).toBe(123);
      expect(instance.stringValue).toBe('test');
    });
  });
});