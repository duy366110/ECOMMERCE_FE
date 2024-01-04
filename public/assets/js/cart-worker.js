"use strict";

const process = async (url = "", token = "",  method = "", payload = null) => {
    try {

        let res = await fetch(url, {
            method: method? method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: payload? payload : null
        })

        return await res.json();

    } catch (error) {
        console.log(error);
        return null;
    }
}

onmessage = async (event) => {
    let { type, url, token, payload }= event.data;

    switch(type) {

        case "increment-product-cart":
        case "decrement-product-cart":
            postMessage(await process(url, token, "PATCH", JSON.stringify(payload)));
            break

        case "remove-product-in-cart":
            postMessage(await process(url, token, "DELETE", JSON.stringify(payload)));
            break

        case "get-cart":
        default:
            postMessage(await process(url, token));
            break;
    }
}