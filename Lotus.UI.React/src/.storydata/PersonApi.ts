import { ArrayHelper } from 'lotus-core/helpers';
import { FilterPropertyHelper, IPageInfoRequest, IRequest, IResponse, IResponsePage, ResponseHelper, SortPropertyHelper } from 'lotus-core/modules/requestAndResponse';
import { TKey } from 'lotus-core/types';
import { Persons } from './PersonData';
import { IPerson } from './PersonInfo';

class PersonApiClass
{
  private static _PersonApiClass: PersonApiClass;

  public static get Instance(): PersonApiClass
  {
    return this._PersonApiClass || (this._PersonApiClass = new this());
  }

  constructor()
  {
    this.getPersonsAsync = this.getPersonsAsync.bind(this);
    this.addPersonsAsync = this.addPersonsAsync.bind(this);
    this.createPersonsAsync = this.createPersonsAsync.bind(this);
    this.updatePersonAsync = this.updatePersonAsync.bind(this);
    this.deletePersonAsync = this.deletePersonAsync.bind(this);
  }

  public getPersonsAsync(filter: IRequest): Promise<IResponsePage<IPerson>>
  {
    const page: IPageInfoRequest = { pageNumber: filter.pageInfo?.pageNumber ?? 0, pageSize: filter.pageInfo?.pageSize ?? 10 };

    let result = Persons;
    result = FilterPropertyHelper.filterArrayByProperties(result, filter.filtering);
    const totalCount = result.length;
    result = SortPropertyHelper.sortArrayByProperties(result, filter.sorting);
    const pageData = ArrayHelper.slicePage(result, page.pageNumber, page.pageSize)
    const response: IResponsePage<IPerson> = {
      payload: pageData,
      pageInfo: ResponseHelper.buildPageInfo(pageData, page, totalCount)
    };

    return Promise.resolve(response);
  }

  public createPersonsAsync(): Promise<IResponse<IPerson>>
  {
    const newPerson: IPerson =
    {
      id: ArrayHelper.maxBy(Persons, 'id').id + 1,
      avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
      name: 'Олег',
      surname: 'Марков',
      roleId: 4,
      tagsIds: [2, 5],
      birthday: '1983-11-11',
      age: Math.random() * 10 + 20,
      power: Math.random() * 100,
    }

    const response: IResponse<IPerson> = { payload: newPerson };

    return Promise.resolve(response);
  }

  public addPersonsAsync(item: IPerson): Promise<IResponse>
  {
    ArrayHelper.insert(Persons, 0, 'lower', item);

    const response: IResponse = {
    };

    // Создаем задержку и только потом возвращаем объект response
    return new Promise(resolve => setTimeout(resolve, 2000))
      .then(() => response);
  }

  public updatePersonAsync(item: IPerson): Promise<IResponse<IPerson>>
  {
    const index = Persons.findIndex(x => x.id === item.id);
    Persons[index] = item;

    const response: IResponse<IPerson> = {
      payload: item
    };
    // Создаем задержку и только потом возвращаем объект response
    return new Promise(resolve => setTimeout(resolve, 2000))
      .then(() => response);
  }

  public deletePersonAsync(id: TKey): Promise<IResponse>
  {
    ArrayHelper.removeBy(Persons, 'id', id)
    const response: IResponse = {
    };
    // Создаем задержку и только потом возвращаем объект response
    return new Promise(resolve => setTimeout(resolve, 2000))
      .then(() => response);
  }
}

export const PersonApi = PersonApiClass.Instance;
