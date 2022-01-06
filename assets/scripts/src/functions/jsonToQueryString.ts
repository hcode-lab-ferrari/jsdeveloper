import { AnyObject } from "../types/anyObject";

export function jsonToQueryString(data: AnyObject) {

    const params: string[] = [];

    Object.keys(data).forEach(key => {

        params.push(`${key}=${data[key]}`);

    });

    return params.join("&");

}