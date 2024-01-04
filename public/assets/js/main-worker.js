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
        console.log(error);
        return null;
    }
}

onmessage = async (event) => {
    console.log(event.data);

//     switch(type) {

//         case "get-product":
//         default:
//             // postMessage(await process(url, token));
//             break;
//     }
}