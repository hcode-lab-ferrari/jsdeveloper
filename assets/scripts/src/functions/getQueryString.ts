export function getQueryString() {

    const queryString = {} as any;
    const { search } = window.location;

    if (search) {

        search.split("?")[1].split("&").forEach(param => {

            const nameAndValue = param.split("=");
            queryString[nameAndValue[0]] = decodeURIComponent(nameAndValue[1]);

        });

    }

    return queryString

}