import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleChat } from "../../../store/store.popup";
import CommonPopupComponent from "../Common-Popup-Component/Common-Popup-Component";
import MainChatSectionComponent from "../../sections/Main/Main-Chat-Section-Component/Main-Chat-Section-Component";
import classes from "./Common-Footer-Component.module.css";

const CommonFooterComponent = (props) => {
    const auth = useSelector((state) => state.auth);
    const popup = useSelector((state) => state.popup);
    const socketIo = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const toggleChatHandler = (event) => {
        dispatch(toggleChat());
        if(popup.chat.status) {
            socketIo.socket.emit('client-disconnect', {token: auth.token});
        }
    }

    return (
        <div className={classes['footer-component']}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className={classes['footer-infor']}>
                            <h2 className={classes['infor--title']}>Customer services</h2>
                            <ul className={classes['infor--content']}>
                                <li>
                                    <Link to="/">Help & contact us</Link>
                                </li>
                                <li>
                                    <Link to="/">Return & refunds</Link>
                                </li>
                                <li>
                                    <Link to="/">Online store</Link>
                                </li>
                                <li>
                                    <Link to="/">Terms & Condition</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className={classes['footer-infor']}>
                            <h2 className={classes['infor--title']}>Company</h2>
                            <ul className={classes['infor--content']}>
                                <li>
                                    <Link to="/">Whay we do</Link>
                                </li>
                                <li>
                                    <Link to="/">Availabe services</Link>
                                </li>
                                <li>
                                    <Link to="/">Latset posts</Link>
                                </li>
                                <li>
                                    <Link to="/">FAQs</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className={classes['footer-infor']}>
                            <h2 className={classes['infor--title']}>Social media</h2>
                            <ul className={classes['infor--content']}>
                                <li>
                                    <Link to="/">Twitter</Link>
                                </li>
                                <li>
                                    <Link to="/">Instagram</Link>
                                </li>
                                <li>
                                    <Link to="/">Facebook</Link>
                                </li>
                                <li>
                                    <Link to="/">Pinterest</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <button className={classes['messenger-btn']} id="messenger-btn" onClick={toggleChatHandler}>
                <img src="/assets/images/messenger.png" alt="chat-messager" />
            </button>

            {popup.chat.status && <MainChatSectionComponent />}

            {/* POPUP COMPONENT */}
            <CommonPopupComponent />
        </div>
    )
}

export default CommonFooterComponent;