export function appendTemplate(element: Element, tagName: string, html: string) {
    const wrapElement = document.createElement(tagName);

    wrapElement.innerHTML = html;

    element.append(wrapElement);

    return wrapElement;
}