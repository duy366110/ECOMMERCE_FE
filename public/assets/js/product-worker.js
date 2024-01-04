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
    let { type, url, token, payload, options }= event.data;
    
    switch(type) {
        case "shop-product-amount":
            postMessage(await process(url));
            break

        case "shop-product-loade-infor":
            let data = await Promise.allSettled([
                process(options.category.url),
                process(options.product.url),
            ]);
        
            postMessage(data);
            break

        case "get-product":
        default:
            postMessage(await process(url, token));
            break;
    }
}