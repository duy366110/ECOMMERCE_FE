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
    let {type, url, token, method, payload} = event.data;

    switch(type) {
        case "get-transaction":
        default:
            postMessage(await process(url, token));
            break;
    }
}