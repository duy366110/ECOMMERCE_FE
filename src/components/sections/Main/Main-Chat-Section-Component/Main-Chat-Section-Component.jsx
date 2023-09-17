import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../configs/config.env";
import { shareSocket } from "../../../../store/store.socket";
import useValidation from "../../../../hook/use-validation";
import openSocket from "socket.io-client";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import classes from "./Main-Chat-Section-Component.module.css";

const MainChatSectionComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const popup = useSelector((state) => state.popup);
    const socketIo = useSelector((state) => state.socket);

    const messageRef = useRef();

    const {resetValue: messageResetVal, value: messageValue, valid: messageValid, onBlur: messageBlur, onChange: messageChange} = useValidation(['require']);

    const [userChat, setUserChat] = useState(null);



    // THỰC HIỆN KẾT NỐI CLIENT VỚI CHAT SERVER
    useEffect(() => {
        if(auth.token && popup.chat.status) {
            const socket = openSocket(`${config.SOCKET}`);
            socket.emit('client-connect', {token: auth.token});
            dispatch(shareSocket({socket}));

            // NHẬN THÔNG TIN KHI USER VỪA JOIN CHAT
            socket.on('client-join-chat', (data) => {
                let { userCare } = data;
                setUserChat(userCare);
            })
            
            // NHẬN MESSAGE TỪ CHĂM SÓC KHÁCH HÀNG
            socket.on('emit-message-form-admin', (data) => {
                let { customerCare } = data;
                setUserChat(customerCare);
            })

            // CẬP NHẬT LẠI NỘI DUNG MESSAGE CỦA KHÁCH HÀNG SAU MỖI LẦN GỬI
            socket.on('update-message-client-just-send', (metadata) => {
                let { userCare } = metadata;
                setUserChat(userCare);
            })

        } else {
            navigate("/auth");
        }

    }, [])

    // THỰC HIỆN GỬI MESSAGE ĐẾN SERVER CHAT 
    const sendMessageHandler = (event) => {
        if(messageValue) {

            // KHÁCH HÀNG GỬI MESSAGE CONTENT TO SERVER.
            socketIo.socket.emit('client-send-message', {token: auth.token, message: messageValue});

            // THỰC HIỆN CLEAR VALUE INPUT MESSAGE.
            messageResetVal();
            messageRef.current.value = '';

        } else {
            alert('Please enter message before contact counselors');
        }
    }



    return  ReactDOM.createPortal (
        <div className={classes['messenger-section-component']}>
            <div className={classes['messenger-titles']}>
                <h1 className={classes['title']}>Customer support</h1>
                <button className={classes['btn-navigate']}>Let's chat app</button>
            </div>

            <div className={classes['message-content']}>

                {userChat && userChat.message.length > 0 && userChat.message.map((message, index) => {
                    return (
                        <div key={index} className={`${classes['content-chat']} ${classes[message.type === 'Client' ? 'client-chat' : 'admin-chat']}`}>
                            {message.type === "Counselors" && (
                                <div className={classes['chat-thumbnail']}>
                                    <img src='/assets/images/client-blank.png' alt="admin" />
                                </div>
                            )}
                            
                            <p className={`${classes['chat-message']}`}>
                                {message.type === "Counselors" && (<span>Admin:</span>)}
                                {message.content}
                            </p>

                            {message.type === 'client' && (
                                <div className={classes['chat-thumbnail']}>
                                    <img src='/assets/images/client-blank.png' alt="client" />
                                </div>
                            )}
                        </div>
                    )
                })}
                
            </div>

            <div className={classes['message-input']}>
                <div className={classes['input-content']}>
                    <img src="/assets/images/client-blank.png" alt="client" />
                    <input ref={messageRef} type="text" onChange={messageChange} placeholder="Enter message!" />
                </div>
                <div className={classes['input-option']}>
                    <button className={classes['option-attach-file']}>
                        <AttachFileIcon />
                    </button>

                    <button className={classes['option-icons']}>
                        <SentimentSatisfiedAltIcon />
                    </button>

                    <button onClick={sendMessageHandler} className={`${classes['option-send']} ${classes['active']}`}>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('chat')
    )
}

export default MainChatSectionComponent;