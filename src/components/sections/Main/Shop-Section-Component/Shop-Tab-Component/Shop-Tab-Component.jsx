import { useSelector } from "react-redux";
import classes from "./Shop-Tab-Component.module.css";

const ShopTabComponent = (props) => {
    const generes = useSelector((state) => state.generes);

    return (
        <div className={classes['tab-component']}>
            <h2 className={classes['tab-title']}>Categories</h2>
            <div className={classes['tab-list']}>
                <h3 className={classes['tab-list-title']}>Apple</h3>
                {generes.categories.length && generes.categories.map((type, index) => {
                    return (
                        <div key={type.id} className={classes['tab-list-content']}>
                            {type.values.length > 0 && (
                                <>
                                    {type.title && index !== 0 && <h4 className={classes['tab-list-content-title']}>{type.title}</h4>}
                                    <ul className={classes['tab-list-content-list']}>
                                        {type.values.length && type.values.map((infor) => {
                                            return (
                                                <li key={`${infor.title}`}>
                                                    <button onClick={props.changeType} data-type={infor._id? infor._id : 'all'}>{infor.title}</button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShopTabComponent;