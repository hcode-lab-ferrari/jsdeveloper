import { appendTemplate } from "./functions/appendTemplate";
import { formatCurrency } from "./functions/formatCurrency";
import { getFormValues } from "./functions/getFormValues";
import { getQueryString } from "./functions/getQueryString";
import { jsonToQueryString } from "./functions/jsonToQueryString";
import { setFormValues } from "./functions/setFormValues";

type ServiceItem = {
    id: number;
    name: string;
    description: string;
    price: number;
}

let serviceSummary: number[] = [];

const renderServiceOptions = (context: HTMLElement, serviceOptions: ServiceItem[]) => {

    const optionsEl = context.querySelector('.options') as HTMLDivElement;

    optionsEl.innerHTML = '';

    serviceOptions.forEach(item => {

        const label = appendTemplate(optionsEl, 'label', `
            <input type="checkbox" name="service" value="${item.id}" />
            <div class="square">
                <div></div>
            </div>
            <div class="content">
                <span class="name">${item.name}</span>
                <span class="description">${item.description}</span>
                <span class="price">${formatCurrency(item.price)}</span>
            </div>
        `);

        const labelInput = label.querySelector('[type=checkbox]') as HTMLInputElement;

        labelInput.addEventListener('change', (e: Event) => {

            const { checked, value } = e.target as HTMLInputElement;

            if (checked) {

                const service = serviceOptions.filter((option) => {
                    return (Number(option.id) === Number(value));    
                })[0];

                serviceSummary.push(service.id);

            } else {

                serviceSummary = serviceSummary.filter(id => {
                    return Number(id) !== Number(value);
                })

            }

            const result = serviceSummary.map(id => serviceOptions.filter(item => (+item.id === +id))[0])

            result.sort((a, b) => {

                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }

            });

            renderServiceSummary(context, serviceOptions)

        });

    });

}

const renderServiceSummary = (context: HTMLElement, serviceOptions: ServiceItem[]) => {

    const tbodyEl = context.querySelector("aside tbody") as HTMLTableSectionElement;

    tbodyEl.innerHTML = '';

    serviceSummary
        .map(id => serviceOptions
        .filter(item => Number(item.id) === Number(id))[0])
        .sort((a, b) => {

            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            } else {
                return 0;
            }

        })
        .forEach(item => {

            appendTemplate(tbodyEl, 'tr', `
                <td>${item.name}</td>
                <td class="price">${formatCurrency(item.price)}</td>
            `)

        });

    const totalEl = context.querySelector('footer .total') as HTMLElement;

    const total = serviceSummary
        .map(id => serviceOptions
        .filter(item => (+item.id === +id))[0])
        .reduce((totalResult, item) => Number(totalResult) + Number(item.price), 0);

    totalEl.innerHTML = formatCurrency(total);

}

const page = document.querySelector<HTMLElement>("#schedules-services");

if (page) {

    const services: ServiceItem[] = [{
        id: 1,
        name: 'Revisão',
        description: 'Verificação mínima necessária.',
        price: 100
    },{
        id: 2,
        name: 'Alinhamento',
        description: 'Alinhamento e balanceamento.',
        price: 400
    },{
        id: 3,
        name: 'Filtros',
        description: 'Troca do filtro de ar e combustível.',
        price: 200
    }];

    renderServiceOptions(page, services);
    renderServiceSummary(page, services);

    const form = page.querySelector('form') as HTMLFormElement;
    const params = getQueryString();

    setFormValues(form, params);

    const buttonSummary = page.querySelector("#btn-summary-toggle") as HTMLButtonElement;

    buttonSummary.addEventListener("click", () => {

        const aside = page.querySelector("aside") as HTMLElement;

        aside.classList.toggle('open');

    });

    form.addEventListener('submit', e => {

        e.preventDefault();

        const values = getFormValues(form);

        window.location.href = `/schedules-payment.html?${jsonToQueryString(values)}`;

    });

}

    
