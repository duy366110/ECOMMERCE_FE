import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import config from "../../../../configs/config.env";
import CommonBreadcrumbComponent from "../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component";
import classes from "./Main-Transaction-Section-Component.module.css";

const MainTransactionSectionComponent = (props) => {
    const loader = useLoaderData();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        let { status, transactions } = loader;
        if(status) {
            setTransactions(transactions);
        }

    }, [loader])

    return (
        <div className={classes['main-transaction-section-component']}>
            <CommonBreadcrumbComponent />
            <div className="container mt-5">

                {transactions.length > 0 && transactions.map((transaction) => {

                    return (
                        <div key={transaction._id} className={`${classes['transaction-table-wrapper']} mb-5 pb-5`}>
                            <table className={classes['transaction-table']}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transaction.order.length > 0 && transaction.order.map((orderItem, index) => {

                                        return (
                                            <tr key={orderItem._id}>
                                                <td>{index}</td>
                                                <td>{orderItem.product.name}</td>
                                                <td>{orderItem.product.price.$numberDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</td>
                                                <td>{orderItem.quantity}</td>
                                            </tr>
                                        )
                                    })}

                                    <tr>
                                        <td className={classes['user-information-title']}>User name</td>
                                        <td colSpan={3}>{transaction.fullName}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes['user-information-title']}>Email</td>
                                        <td colSpan={3}>{transaction.email}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes['user-information-title']}>Phone</td>
                                        <td colSpan={3}>{transaction.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes['user-information-title']}>Address</td>
                                        <td colSpan={3}>{transaction.address}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes['user-information-title']}>Order date</td>
                                        <td colSpan={3}>{new Date(transaction.date).toLocaleString()}</td>
                                    </tr>
                                    <tr className={classes['order-total-price']}>
                                        <td className={classes['user-information-title']}>Total</td>
                                        <td colSpan={3}>{transaction.order.reduce((acc, orderItem) => {
                                            acc += Number(orderItem.product.price.$numberDecimal) * Number(orderItem.quantity);
                                            return acc;
                                        }, 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}

                {!transactions.length > 0 && <p className='product-blank'>Not found transaction!</p>}

            </div>
        </div>
    )
}


export default  MainTransactionSectionComponent;

export const loader = () => {
    const worker = new Worker(`${window.location.origin}/assets/js/worker.js`);
    return new Promise( async(resolve, reject) => {
        try {
            let user = localStorage.getItem("user");

            if(user) {
                user = JSON.parse(user);
                worker.postMessage({
                    type: "get-transaction",
                    url: `${config.URI}/api/client/transaction`,
                    token: `Bearer ${user.token}`
                });
                
                worker.onmessage = (event) => {
                    let {status, message} = event.data;

                    if(!status) throw Error(message);
                    resolve(event.data);
                }
            }
        } catch (error) {
            reject({status: false, error});
        }
    })
}