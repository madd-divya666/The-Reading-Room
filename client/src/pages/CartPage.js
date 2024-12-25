import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { get } from "mongoose";
import { BiPieChartAlt2 } from "react-icons/bi";


const CartPage = () => {
  const [products2, setProducts2] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [cart2, setCart2] = useState([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  //getall products
  // const getAllProducts = async () => {
  //   try {
  //     const res = await axios.get("https://the-reading-room-3z29.onrender.com/api/v1/product/get-product");
  //     // setProducts2(data2.products);
  //     // console.log(products2);
  //     console.log(res.data.products);
  //     setProducts2(res.data.products);
  //     console.log(products2);
  //     // setProducts2((products2) => [...data.products]);
  //     console.log(products2);
  //     products2?.forEach((p) => {
  //       cart?.forEach((c) => {
  //         console.log(p._id);
  //         console.log(c);
  //         if (p._id === c) {
  //           console.log(77);
  //           setCart2([...cart2, p]);
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Someething Went Wrong");
  //   }
  // }

  // //lifecycle method
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // getall products


  // getAllProducts();
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      // let myCart = [...cart2];
      // let index = myCart.findIndex((item) => item._id === pid);
      // myCart.splice(index, 1);
      // setCart2(myCart);
      let myCart1 = [...cart];
      let index1 = myCart1.findIndex((item) => item._id === pid);
      myCart1.splice(index1, 1);
      setCart(myCart1);
      localStorage.setItem("cart", JSON.stringify(myCart1));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://the-reading-room-3z29.onrender.com/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    getToken();


  }, [auth?.token]);


  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://the-reading-room-3z29.onrender.com/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders2");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-danger p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`https://the-reading-room-3z29.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Wishlist Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>

                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <h1>Study Hard</h1>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  " "
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
