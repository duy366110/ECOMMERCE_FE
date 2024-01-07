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
        return {
            status: false,
            message: error.message
        };
    }
}

onmessage = async (event) => {
    let data = null;
    let {type, url, token, method, payload, options} = event.data;

    switch(type) {
        case "shop-product-amount":
        case "shop-get-product":
            postMessage(await process(url));
            break

        case "get-transaction":
        case "get-user-cart":
            postMessage(await process(url, token));
            break

        case "main-get-infor":
            data = await Promise.allSettled([
                process(options.featured.url),
            ]);
        
            postMessage(data);
            break

        case "shop-product-loade-infor":
        case "get-product-detail":
            data = await Promise.allSettled([
                process(options.category.url),
                process(options.product.url),
            ]);
            postMessage(data);
            break;

        case "auth-sign-in":
        case "auth-sign-up":
        case "user-add-product-cart":
        case "increment-product-cart":
        case "decrement-product-cart":
        case "remove-product-in-cart":
        case "user-order":
        default:
            postMessage(await process(url, token, method, payload));
            break;
    }
}