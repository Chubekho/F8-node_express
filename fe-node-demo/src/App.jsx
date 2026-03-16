import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const [currentUser, setCurrentuser] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch("http://127.0.0.1:3000/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((res) => {
        if (!res.ok) throw res;

        return res.json();
      })
      .then((result) => alert(result.data))
      .catch(() => alert("Link expired of invalid"));
  }, [token]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch("http://127.0.0.1:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setCurrentuser(result.data));
  }, []);

  const handleResendEmail = () => {
    const accessToken = localStorage.getItem("accessToken");
    fetch("http://127.0.0.1:3000/api/auth/resend-verify-email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  if (!currentUser) return <>Loading. . .</>;
  return (
    <div>
      {!currentUser.verify_at && (
        <p>
          Không nhận được email?{" "}
          <a href="#" onClick={handleResendEmail}>
            Gửi lại
          </a>
        </p>
      )}
      {
        <>
          <p>xin chao {currentUser.email}</p>
        </>
      }
    </div>
  );
}

export default App;
