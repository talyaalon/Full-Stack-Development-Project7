import "./Info.css";
import { useEffect, useState } from "react";

const Info = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  return (
    <div className="info-container" lang="he" dir="rtl">
      <h1 className="info-header">איזור אישי</h1>
      {user && (
        <div className="background">
          <div className="info-details">
            <h3 className="info-item">תעודת זהות: {user.id}</h3>
            <h3 className="info-item">שם: {user.name}</h3>
            <h3 className="info-item">שם משתמש: {user.username}</h3>
            <h3 className="info-item">מייל: {user.email}</h3>
            <h3 className="info-item">פלאפון: {user.phone}</h3>
            <h3 className="info-item">כתובת: {user.address}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
