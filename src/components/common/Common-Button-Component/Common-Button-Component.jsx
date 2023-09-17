import Button from '@mui/material/Button';
import classes from "./Common-Button-Component.module.css";

const CommonButtonComponent = (props) => {

    return (
        <Button
            disabled={props.disabled? props.disabled : false}
            data-id={props.id}
            onClick={props.onClick}
            type={props.type}
            className={`${classes["btn-common"]}`}
            id="btn-common"
            variant={props.variant}>
            {props.children}
        </Button>
    )
}

export default CommonButtonComponent;