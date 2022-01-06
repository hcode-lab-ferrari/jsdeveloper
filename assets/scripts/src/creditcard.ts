import IMask from 'imask';
import { getQueryString } from './functions/getQueryString';
import { setFormValues } from './functions/setFormValues';

const page = document.querySelector('#schedules-payment') as HTMLElement;

if (page) {

    const form = page.querySelector("form") as HTMLFormElement;
    const name = page.querySelector('#name') as HTMLInputElement;
    const number = page.querySelector('#number') as HTMLInputElement;
    const expiry = page.querySelector('#expiry') as HTMLInputElement;
    const inputCvv = page.querySelector('#cvv') as HTMLInputElement;
    const creditCard = page.querySelector('#credit-card') as HTMLDivElement;
    const svgCvv = page.querySelector('svg .cvv') as SVGTSpanElement;
    const svgName = page.querySelector('svg .name') as SVGTSpanElement;
    const svgNumber1 = page.querySelector('svg .number-1') as SVGTSpanElement;
    const svgNumber2 = page.querySelector('svg .number-2') as SVGTSpanElement;
    const svgNumber3 = page.querySelector('svg .number-3') as SVGTSpanElement;
    const svgNumber4 = page.querySelector('svg .number-4') as SVGTSpanElement;
    const svgExpiry = page.querySelector('svg .expiry') as SVGTSpanElement;

    setFormValues(form, getQueryString());

    name.addEventListener("keyup", e => {

        svgName.innerHTML = name.value.toUpperCase()

    })

    number.addEventListener("keyup", e => {

        const numberString = number.value.replaceAll(' ', '')

        svgNumber1.innerHTML = numberString.substr(0, 4)
        svgNumber2.innerHTML = numberString.substr(4, 4)
        svgNumber3.innerHTML = numberString.substr(8, 4)
        svgNumber4.innerHTML = numberString.substr(12, 4)

    })

    expiry.addEventListener('keyup', e=> {

        svgExpiry.innerHTML = expiry.value

    })

    inputCvv.addEventListener('keyup', e => {

        svgCvv.innerHTML = inputCvv.value

    })

    creditCard.addEventListener('click', e => {

        creditCard.classList.toggle('flipped')

    })

    inputCvv.addEventListener('focus', e=> {
        creditCard.classList.add('flipped')
    })

    inputCvv.addEventListener('blur', e=> {
        creditCard.classList.remove('flipped')
    })

    IMask(number, {
        mask: '0000 0000 0000 0000'
    });

    IMask(expiry, {
        mask: '00/00'
    });

    IMask(inputCvv, {
        mask: '000[0]'
    });

    page.querySelectorAll("input").forEach(input => {

        input.addEventListener("focus", e => {
            page.classList.add("keyboard-open")
        })

        input.addEventListener("blur", e => {
            page.classList.remove("keyboard-open")
        })

    })

}