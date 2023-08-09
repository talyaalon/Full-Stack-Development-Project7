import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "./ShoppingCart.css";

export default function ShoppingCart() {
  var user = JSON.parse(localStorage.getItem("currentUser"));
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from local storage when the component mounts
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shoppingCart"));
    setCartItems(data || []);
  }, []);

  // Calculate the total amount to be paid
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product_price * item.product_quantity,
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <h1>עגלת הקניות שלך</h1>
        <p>אין פריטים בעגלה</p>
      </div>
    );
  }

  return (
    <div className="cart-container" lang="he" dir="rtl">
      <h1>עגלת הקניות שלך</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>תיאור</th>
            <th>שם המוצר</th>
            <th>מחיר</th>
            <th>כמות</th>
            <th>מחיר כולל</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.product_img} alt={item.product_name} />
              </td>
              <td>{item.product_name}</td>
              <td>{item.product_price}₪</td>
              <td>{item.product_quantity}</td>
              <td>{item.product_price * item.product_quantity}₪</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">סה"כ לתשלום: {totalAmount}₪</div>
      <br></br>
      <Link to={`/Home/${user.id}/Pay`}>
        <button className="pay-button">לתשלום</button>
      </Link>
    </div>
  );
}
