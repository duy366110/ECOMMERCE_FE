"use strict";

const processGetCart = async (url = "", token) => {
    try {

        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            }
        })

        return await res.json();

    } catch (error) {
        return null;
    }
}

onmessage = async (event) => {
    let { type, url, token }= event.data;

    if(type === "get-cart") {
        postMessage(await processGetCart(url, token));
    }
}