import { Outlet, Link } from "react-router-dom";
import "./Users.css";
import logo from "./logo.jpg";

const Users = () => {
  var user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="users-container">
      <h1 className="user-name">שלום {user.name}</h1>
      <img className="logo" src={logo} alt="logo" />
      <Link to={`/Home/${user.id}/Info`}>
        <button className="personal-button">איזור אישי</button>
      </Link>
      <Link to="/Login">
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("shoppingCart");
          }}
        >
          התנתקות
        </button>
      </Link>
      <nav className="user-navigation">
        <ul>
          <li>
            <Link to={`/Home`}>עמוד הבית</Link>
          </li>
          <li>
            <Link to={`/Home/Milk`}>מוצרי חלב</Link>
          </li>
          <li>
            <Link to={`/Home/Cleaning`}>מוצרי ניקיון</Link>
          </li>
          <li>
            <Link to={`/Home/Basic`}>מוצרי יסוד</Link>
          </li>
          <li>
            <Link to={`/Home/Frozen`}>מחלקת קפואים</Link>
          </li>
          <li>
            <Link to={`/Home/Fruit`}>פירות וירקות</Link>
          </li>
        </ul>
      </nav>
      {user.user_rank === "user" && (
        <Link to={`/Home/${user.id}/ShoppingCart`}>
          <button className="shoppingCart-button">עגלת קניות</button>
        </Link>
      )}
      <Outlet />
    </div>
  );
};

export default Users;
