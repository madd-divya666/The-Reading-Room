import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Mylearningmenu from "../../components/Layout/Mylearningmenu";
// import { Navigate } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const getOrders = async () => {
        try {
            const { data } = await axios.get("https://the-reading-room-3z29.onrender.com/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title={"Your Orders"}>
            <div className="container-fluid p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <Mylearningmenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center"></h1>

                        {orders?.map((o, i) => {
                            return (

                                <div className="container">
                                    {/* {o?.products?.filter((p, i) => !p.content2)?.length || <div>  </div>} */}
                                    {o?.products?.filter((p, i) => !p.content2)?.map((p, i) => (
                                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                            <div className="col-md-7">
                                                <embed
                                                    src={`https://the-reading-room-3z29.onrender.com/api/v1/product/product-content1/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    width={"400px"}
                                                    height={"300px"}

                                                />
                                                <a href={`https://the-reading-room-3z29.onrender.com/api/v1/product/product-content1/${p._id}`}>Open in new Tab</a>
                                            </div>
                                            <div className="col-md-5">
                                                <p>{p.name}</p>
                                                <p>{p.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
