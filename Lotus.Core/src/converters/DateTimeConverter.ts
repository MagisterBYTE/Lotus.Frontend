
export class DateTimeConverter
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static convert(item: any): Date
  {
    if(item)
    {
      if(item instanceof Date)
      {
        return item as Date;
      }
      if(typeof item == 'number')
      {
        return new Date(item as number);
      }
      if(typeof item == 'string')
      {
        return new Date(Date.parse(item as string));
      }
    }
    return new Date(Date.now());
  }
}
