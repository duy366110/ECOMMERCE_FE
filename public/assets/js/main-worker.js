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
    let { type, featured } = event.data;
    
    switch(type) {
        case "main-get-infor":
        default:
            let data = await Promise.allSettled([
                process(featured.url),
            ]);
        
            postMessage(data);
            break
    }
}