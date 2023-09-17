import ENVIRONEMENT from "../enviroment";

const Config = {
    DEV: {
        URI: ENVIRONEMENT.URL.DEV,
        SOCKET: ENVIRONEMENT.SOCKET.DEV
    },
    PRO: {
        URI: ENVIRONEMENT.URL.PRO,
        SOCKET: ENVIRONEMENT.SOCKET.PRO
    }
}

let config = Config[ENVIRONEMENT.MODEL];

export default config;