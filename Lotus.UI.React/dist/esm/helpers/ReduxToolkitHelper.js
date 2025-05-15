export class ReduxToolkitHelper {
    static getErrorText(value) {
        const newChar = '\n';
        return `code = ${value.code}${newChar}name = ${value.name}${newChar}message = ${value.message}`;
    }
}
