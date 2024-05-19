import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import apis from "../store/apis";

type Props = {
  item: Product;
};

const OrderComponent: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [calculated, setCalculated] = useState({
    size: "0",
    price: "0",
    quantity: "0",
  });
  const [location, setLocation] = useState<ILocation>({
    district: "",
    sector: "",
    village: "",
  });

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevState) => ({ ...prevState, [name]: value }));
  };

  const { error, message, loading, success } = useSelector(
    (state: RootState) => state.order
  );

  const handleSubmit = () => {
    const order: OrderData = {
      ...location,
      landSize: +calculated.size,
      products: [{ id: +item.id, quantity: +calculated.quantity }],
    };
    dispatch(apis.orderPlacement(order) as unknown as UnknownAction);
  };

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        if (success) {
          setCalculated((state) => ({ ...state, size: "0" }));
          setLocation({ district: "", sector: "", village: "" });
        }
      }, 4000);
    }
  }, [error, dispatch, success, navigate]);

  const calculator = useCallback(
    (size: string) => {
      // calculating fertilizer
      //   if (type === 2) {
      const quantity = +size * (item.type === 1 ? 1 : 3);
      const price = +quantity * +item.price;

      setCalculated((prevState) => ({
        ...prevState,
        size,
        price: String(price),
        quantity: String(quantity),
      }));
      //   }
    },
    [item.price, item.type]
  );

  return (
    <div className="orders_component">
      <h2 className="title">{item.name}</h2>
      <div
        className="product_avatar"
        style={{
          backgroundImage: `url(${item.picture})`,
        }}
      ></div>
      <div className="product_description">
        <h5 className="item_price">
          {item.type === 1 ? "Seed" : "Fertilizer"}
        </h5>
        <h5 className="item_price">{item.price} Rwf/Kg</h5>
        <h5 className="item_price">Stock: {item.available} Kg</h5>
      </div>
      <div className="calculator">
        <h3>Order Calculator</h3>
        <div>
          <div>
            <h5 className="item_price">Land Size</h5>
            <input
              value={calculated.size}
              onChange={(e) => calculator(e.target.value)}
              type="text"
            />
          </div>
          <h3 className="item_price">{calculated.quantity} Kg</h3>
          <h3 className="item_price">{calculated.price} Rwf</h3>
        </div>
      </div>
      <div className="location">
        <h3>Land Locaiton</h3>
        <div>
          <div>
            <h5 className="item_price">District</h5>
            <input
              value={location.district}
              onChange={handleLocationChange}
              type="text"
              name="district"
            />
          </div>
          <div>
            <h5 className="item_price">Sector</h5>
            <input
              value={location.sector}
              onChange={handleLocationChange}
              type="text"
              name="sector"
            />
          </div>
          <div>
            <h5 className="item_price">Village</h5>
            <input
              value={location.village}
              onChange={handleLocationChange}
              type="text"
              name="village"
            />
          </div>
        </div>
      </div>
      <div className={success ? "auth_success" : "auth_error"}>
        {(error || success) && <p>{message}</p>}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="order_button"
      >
        {loading ? "Loading..." : "Order"}
      </button>
    </div>
  );
};

export default OrderComponent;
