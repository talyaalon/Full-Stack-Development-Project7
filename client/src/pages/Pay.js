import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "./Basic.css";

export default function Pay() {
  return (
    <div>
      <form>
        <div className="details-container" lang="he" dir="rtl">
          <div className="personal-information">
            <h2>פרטים אישיים</h2>
            <label htmlFor="fname">שם פרטי:</label>
            <br />
            <input type="text" id="fname" name="fname" required />
            <br />
            <br />
            <label htmlFor="lname">שם משפחה:</label>
            <br />
            <input type="text" id="lname" name="lname" required />
            <br />
            <br />
            <label htmlFor="email">מייל:</label>
            <br />
            <input type="email" id="email" name="email" required />
            <br />
            <br />
            <label htmlFor="phone">טלפון:</label>
            <br />
            <input type="tel" id="phone" name="phone" required />
            <br />
            <br />
          </div>

          <div className="pay-information">
            <h2>פרטי אשראי</h2>
            <label htmlFor="card_number">מספר כרטיס: </label>
            <br />
            <input type="number" id="card_number" name="card_number" required />
            <br />
            <br />
            <label htmlFor="date">תוקף:</label>
            <br />
            <input type="text" id="date" name="date" required />
            <br />
            <br />
            <label htmlFor="test">ספרות בגב הכרטיס:</label>
            <br />
            <input type="number" id="test" name="test" required />
            <br />
            <br />
          </div>
        </div>
        <br />
        <br />
        <Link to={`/Home/Confirm`}>
          <button
            onClick={() => {
              localStorage.setItem("shoppingCart", JSON.stringify([]));
            }}
            className="confirm-button"
            type="submit"
          >
            השלם רכישה
          </button>
        </Link>
      </form>
    </div>
  );
}
