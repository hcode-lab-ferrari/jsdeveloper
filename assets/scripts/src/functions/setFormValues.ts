import { AnyObject } from "../types/anyObject";
import { HTMLFormField } from "../types/HTMLFormField";

export function setFormValues(form: HTMLFormElement, values: AnyObject) {

    Object.keys(values).forEach(key => {

        const field = form.querySelector<HTMLFormField>(`[name=${key}]`);

        if (field) {
            switch (field.type) {

                case "select":
                    const option = field.querySelector<HTMLOptionElement>(`option[value=${values[key]}]`);
                    
                    if (option) {
                        option.selected = true;
                    }
                    break  
                case "checkbox":
                case "radio":
                    const input = form.querySelector<HTMLInputElement>(`[name=${key}][value=${values[key]}]`);
                    if (input) {
                        input.checked = true;
                    }
                    break
                default:
                    field.value = values[key];

            }
        }

    });

}