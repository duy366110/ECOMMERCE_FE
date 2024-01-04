"use strict"

const process = async (url = "", token = "",  method = "", payload = null) => {
    try {

        let res = await fetch(url, {
            method: method? method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token? token: ""
            },
            body: payload? payload : null
        })

        return await res.json();

    } catch (error) {
        return null;
    }
}

onmessage = async (event) => {
    let { type, url, token, payload }= event.data;

    switch(type) {
        case "shop-product-amount":
            break

        case "get-product":
        default:
            postMessage(await process(url, token));
            break;
    }
}