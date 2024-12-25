import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProblem = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [statement, setStatement] = useState("");
    const [answer, setAnswer] = useState("");


    //create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        console.log(options, 3);

        try {

            const productData = new FormData();
            productData.append("statement", statement);
            productData.append("answer", answer);
            productData.append("options", options);


            const { data } = axios.post(
                "https://the-reading-room-3z29.onrender.com/api/v1/product/create-problem",
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Created Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Problems</h1>
                        <div className="m-1 w-75">

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={statement}
                                    placeholder="write a Statemet"
                                    className="form-control"
                                    onChange={(e) => setStatement(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={option1}
                                    placeholder="write a option1"
                                    className="form-control"
                                    onChange={(e) => setOption1(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={option2}
                                    placeholder="write a option2"
                                    className="form-control"
                                    onChange={(e) => setOption2(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={option3}
                                    placeholder="write a option3"
                                    className="form-control"
                                    onChange={(e) => setOption3(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={option4}
                                    placeholder="write a option4"
                                    className="form-control"
                                    onChange={(e) => setOption4(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={answer}
                                    placeholder="write answer"
                                    className="form-control"
                                    onChange={(e) => {
                                        setAnswer(e.target.value);
                                        let p2 = [];
                                        p2.push(option1);
                                        p2.push(option2);
                                        p2.push(option3);
                                        p2.push(option4);
                                        setOptions([...p2]);

                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    LAUNCH
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Layout >
    );
};

export default CreateProblem;
