import { useDispatch  } from "react-redux";
import { toggleLoader } from "../store/store.popup";

const useWorker = () => {
    const worker = new Worker(`${window.location.origin}/assets/js/worker.js`);
    const dispatch = useDispatch();
    
    const working = (infor = {
            type: "", url: "", token: "", method: "", payload: null
    }, cb) => {
        dispatch(toggleLoader());
        worker.postMessage({
            type: infor.type,
            url: infor.url,
            token: infor.token,
            method: infor.method,
            payload: infor.payload
        })

        worker.onmessage = (event) => {
            cb(event.data);
            dispatch(toggleLoader());
        }
    }

    return {
        working
    }
}

export default useWorker;