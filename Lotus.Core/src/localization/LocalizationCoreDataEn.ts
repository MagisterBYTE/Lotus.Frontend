export const LocalizationCoreDataEn =
{
  api:
  {
    errorNotOnline: 'Failed to send request. Please check your internet access.',
    errorNotFound: 'The specified address {0} could not be found. Please check that the server is available and that the address is correct'
  },
  common:
  {
    name: 'Name',
    displayName: 'Display Name',
    failed: 'Error',
    succeed: 'Successfully'
  },
  actions: {
    get: 'Get',
    getting: 'Getting...',
    gettingSucceed: 'Data retrieval was successful',
    gettingFailed: 'An error occurred while retrieving data',
    add: 'Add',
    adding: 'Adding...',
    addingSucceed: 'Addition was successful',
    addingFailed: 'An error occurred while adding',
    edit: 'Edit',
    save: 'Save',
    saving: 'Saving...',
    savingSucceed: 'Saving was successful',
    savingFailed: 'An error occurred while saving',
    duplicate: 'Duplicate',
    delete: 'Delete',
    deleting: 'Deleting...',
    deletingSucceed: 'Deletion was successful',
    deletingFailed: 'An error occurred while deleting',
    deleteObject: 'Delete object?',
    cancel: 'Cancel',
    clear: 'Clear',
    confirm: 'Confirm'
  },
  filters:
  {
    equals: 'Equals',
    equalsAbbr: '=',
    notEqual: 'Not equal',
    notEqualAbbr: '!=',
    lessThan: 'Less than',
    lessThanAbbr: '<',
    lessThanOrEqual: 'Less than or equal',
    lessThanOrEqualAbbr: '<=',
    greaterThan: 'Greater than',
    greaterThanAbbr: '>',
    greaterThanOrEqual: 'Greater than or equal',
    greaterThanOrEqualAbbr: '>=',
    between: 'Between',
    betweenAbbr: '<>',
    contains: 'Contains',
    startsWith: 'Starts with',
    endsWith: 'Ends with',
    like: 'Contains',
    notEmpty: 'Not empty',
    empty: 'Empty',
    includeAny: 'Any of the elements',
    includeAll: 'All of the elements',
    includeEquals: 'Only these elements',
    includeNone: 'None of the elements'
  },
  byteSize:
  {
    bytes: 'bytes',
    Kb: 'Kb',
    Mb: 'Mb',
    Gb: 'Gb'
  },
  validation:
  {
    invalidEmail: 'Incorrect email',
    required: 'Field is required',
    maxLength: (length: number) => `Field length cannot exceed ${length} characters`
  }
};
