import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [isManager, setIsManager] = useState(false); // State for the checkbox
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    setIsManager(event.target.checked);
  };

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${inputs.username}`
      );
      const data = await response.json();
      console.log(data);
      console.log(data[0]["password"]);
      const shoppingCart = [];

      let exist = false;
      let isAdmin = false;
      console.log(inputs.password);

      if (inputs.password === data[0]["password"]) {
        exist = true;
        if (!isManager) {
          var json = JSON.stringify(data[0]);
          localStorage.setItem("currentUser", json);
          var shoppingCartJson = JSON.stringify(shoppingCart);
          localStorage.setItem("shoppingCart", shoppingCartJson);

          navigate(`/Home`);
        } else {
          if (data[0]["user_rank"] === "admin") isAdmin = true;
          if (isAdmin) {
            var json = JSON.stringify(data[0]);
            localStorage.setItem("currentUser", json);
            navigate(`/Home`);
          } else {
            alert("אתה לא מנהל");
          }
        }
      }

      if (exist === false) {
        alert("שם משתמש או סיסמא שגויים");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    fetchData();
  };

  return (
    <div className="login-container" lang="he" dir="rtl">
      <form onSubmit={handleSubmit}>
        <h1>התחברות</h1> {/* Login in Hebrew */}
        <div className="form-group">
          <label htmlFor="username" style={{ textAlign: "right" }}>
            שם משתמש:
          </label>{" "}
          {/* Username in Hebrew */}
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ textAlign: "right" }}>
            סיסמא:
          </label>{" "}
          {/* Password in Hebrew */}
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
          <br />
          <div className="flex-col-c p-t-10">
            <span className="txt1 p-b-17">אין לך חשבון? </span>{" "}
            {/* Don't have an account? in Hebrew */}
            <Link to="/Register">הרשם כאן</Link> {/* Sign up in Hebrew */}
          </div>
        </div>
        <div className="form-group" style={{ textAlign: "center" }}>
          <label style={{ display: "block", direction: "rtl" }}>
            <input
              type="checkbox"
              checked={isManager}
              onChange={handleCheckboxChange}
            />
            אני מנהל
          </label>
          {/* I am a manager in Hebrew */}
        </div>
        <button type="submit">התחבר</button> {/* Login in Hebrew */}
      </form>
    </div>
  );
};

export default Login;
