import { MDBContainer, MDBCol } from "mdb-react-ui-kit";
import bcground from "./images/image.png";
import axios from "axios";
import { loginUser , saveToken } from "./queries";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault();
    try {
        const data = await loginUser({ email, password });
        const token = data.data.token;
        if (data.data.status === "blocked") {
            alert("Your account blocked");
            navigate('/signin')
        }
       saveToken(token, rememberMe);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/')
        alert("You entered successful!");
    } catch (err) {
        const msg = err.response?.data?.message || "Ошибка входа. Попробуйте позже.";
        setError(msg);
    }
  }
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center"
      style={{ height: "100vh", backgroundColor: "white", padding: "0" }}
    >
      <MDBCol
        md="6"
        className="align-items-center justify-content-center"
        style={{ backgroundColor: "#fff", padding: "40px", height: "100%" }}
      >
        <h1 className="appLogo">THE APP</h1>
        <MDBContainer fluid className="outer">
          <form className="loginfrom" onSubmit={submit}>
            <div className="text1" style={{ padding: "10px 0" }}>
              <h3 style={{ fontWeight: "bold", color: "black" }}>
                Sign in to the App
              </h3>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="email"
                id="form1Example1"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" for="form1Example1">
                E-mail
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="password"
                id="form1Example2"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" for="form1Example2">
                Password
              </label>
            </div>
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                  defaultChecked
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="form1Example3">
                  Remember me
                </label>
              </div>
            </div>
            <button
              data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block"
            >
              Log in
            </button>
          </form>
          <p className="linkSignorLog">
            <span>
              Dont have an account? <Link  to="/signup">Sign up</Link>
            </span>
            <Link to="/forgot">Forgot password?</Link>
          </p>
        </MDBContainer>
      </MDBCol>
      <MDBCol>
        <img
          className="right"
          src={bcground}
          style={{ height: "100vh", width: "100%" }}
        ></img>
      </MDBCol>
    </MDBContainer>
  );
}
