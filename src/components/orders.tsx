import React, { useCallback, useState } from "react";

type Props = {
  item: Product;
};

const OrderComponent: React.FC<Props> = ({ item }) => {
  const [calculated, setCalculated] = useState({
    size: "0",
    price: "0",
    quantity: "0",
  });

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
        <h5 className="item_price">{item.price} Rwf</h5>
        <h5 className="item_price">{item.available} Kg</h5>
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
      <button className="order_button">Order</button>
    </div>
  );
};

export default OrderComponent;
