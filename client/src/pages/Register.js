import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function fetchData() {
    const user = {
      name: inputs.name,
      username: inputs.username,
      password: inputs.password,
      phone: inputs.phone,
      email: inputs.email,
      address: inputs.address,
      user_rank: "user",
    };

    console.log(user.username);

    try {
      const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);
      console.log(data[0]);

      navigate(`/Login`);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    if (inputs.password !== inputs.validationPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    fetchData();
  };

  return (
    <div className="login-container" lang="he" dir="rtl">
      <form onSubmit={handleSubmit} dir="rtl">
        <h1>הרשמה</h1>
        <div className="form-group">
          <label htmlFor="name">שם מלא:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">מייל:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">טלפון:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={inputs.phone || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">כתובת:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמא:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">אימות סיסמא:</label>
          <input
            type="password"
            id="validationPassword"
            name="validationPassword"
            value={inputs.validationPassword || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">שליחה</button>
      </form>
    </div>
  );
};

export default Register;
