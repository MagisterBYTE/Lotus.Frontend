export const useForm = (defaultValues) => (handler) => async (event) => {
    event.preventDefault();
    event.persist();
    const form = event.target;
    const elements = Array.from(form.elements);
    const data = elements
        .filter((element) => element.hasAttribute('name'))
        .reduce((object, element) => ({
        ...object,
        [`${element.getAttribute('name')}`]: element.value
    }), defaultValues);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await handler(data);
    form.reset();
};
//# sourceMappingURL=useForm.js.map