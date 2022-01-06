import { AnyObject } from "../types/anyObject";
import { HTMLFormField } from "../types/HTMLFormField";

export function getFormValues(form: HTMLFormElement) {

    const values = {} as AnyObject;

    form.querySelectorAll<HTMLFormField>("[name]").forEach(field => {

        switch (field?.type) {

            case "select":
                const optionSelected = field.querySelector("option:selected") as HTMLOptionElement;
                values[field.name] = optionSelected?.value;
                break
            case "radio":
                const radio = form.querySelector(`[name=${field.name}]:checked`) as HTMLInputElement;
                values[field.name] = radio.value;
                break
            case "checkbox":
                values[field.name] = []
                form.querySelectorAll<HTMLInputElement>(`[name=${field.name}]:checked`).forEach(checkbox => {
                    values[field.name].push(checkbox.value);
                })
                break
            default:
                values[field.name] = field.value;

        }

    });

    return values;

}