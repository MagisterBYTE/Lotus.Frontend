/**
 * Класс для представления(описания) свойств объектов
 */
export class ObjectInfo {
    descriptors = [];
    constructor() {
        this.getProperties = this.getProperties.bind(this);
        this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
        this.getPropertyByName = this.getPropertyByName.bind(this);
        this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);
    }
    getProperties() {
        return this.descriptors;
    }
    getPropertiesSorted() {
        return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
    }
    getPropertyByName(name) {
        return this.descriptors.find(x => x.fieldName === name);
    }
    getFilterFunctionsDesc() {
        const filterFunctions = {};
        this.descriptors.forEach((x) => {
            if (x.filtering && x.filtering.enabled) {
                filterFunctions[`${x.fieldNameBackend ?? x.fieldName}`] = x.filtering.functionDefaultDesc;
            }
        });
        return filterFunctions;
    }
}
//# sourceMappingURL=ObjectInfo.js.map