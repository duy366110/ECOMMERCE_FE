import classes from "./Common-Popup-Message-Component.module.css";

const CommonPopupMessageComponent = (props) => {

    return (
        <div className={classes['common-popup-message-component']}>
            <p>{props.content}</p>
        </div>
    )
}

export default CommonPopupMessageComponent;