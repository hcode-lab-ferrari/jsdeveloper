import { format, parse } from "date-fns";
import locale from 'date-fns/locale/pt-BR';
import { appendTemplate } from "./functions/appendTemplate";
import { getFormValues } from "./functions/getFormValues";
import { getQueryString } from "./functions/getQueryString";
import { setFormValues } from "./functions/setFormValues";

const data = [{
    id: 1,
    value: '9:00'
}, {
    id: 2,
    value: '10:00'
}, {
    id: 3,
    value: '11:00'
}, {
    id: 4,
    value: '12:00'
}, {
    id: 5,
    value: '13:00'
}, {
    id: 6,
    value: '14:00'
}, {
    id: 7,
    value: '15:00'
}]

const renderTimeOptions = (context: HTMLElement) => {

    const targetElement = context.querySelector(".options") as HTMLDivElement;

    targetElement.innerHTML = "";

    data.forEach(item => {

        appendTemplate(
            targetElement,
            "label",
            `
                <input type="radio" name="option" value="${item.value}" />
                <span>${item.value}</span>
            `
        );

    });    

}

const validateSubmitForm = (context: HTMLElement) => {

    const button = context.querySelector("[type=submit]") as HTMLButtonElement;

    const checkValue = () => {

        if (context.querySelector("[name=option]:checked")) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }

    }

    window.addEventListener('load', checkValue);

    context.querySelectorAll("[name=option]").forEach(input => {

        input.addEventListener("change", checkValue);

    });

}

const page = document.querySelector("#time-options") as HTMLElement;

if (page) {

    renderTimeOptions(page)

    validateSubmitForm(page)

    const params = getQueryString();
    const title = page.querySelector("h3") as HTMLHeadingElement;
    const form = page.querySelector("form") as HTMLFormElement;
    const scheduleAtHidden = page.querySelector("[name=schedule_at]") as HTMLInputElement;
    const scheduleAt = parse(params.schedule_at, "yyyy-MM-dd", new Date());

    scheduleAtHidden.value = params.schedule_at;

    setFormValues(form, params);

    title.innerHTML = format(scheduleAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale });

}