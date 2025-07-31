import { MDBContainer, MDBCol, MDBRow  } from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import bcground from "./images/image.png";
import { registerUser , saveToken  } from "./queries";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate()
 async function submit(e) {
  e.preventDefault();
  try {
    const data = await registerUser({ name, email, password, rememberMe });
    const token = data.data.token;
    saveToken(token , rememberMe)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    navigate('/')
    alert("Registration succesful!");
  } catch (error) {
    alert(error);
  }
}
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center"
      style={{ height: "100vh", backgroundColor: "white", padding: "0" }}
    >
      <MDBCol
        className="align-items-center"
        style={{ backgroundColor: "#fff", padding: "0 40px"}}
      >
        <h1 className="appLogo">THE APP</h1>
        <MDBContainer fluid className="outer">
          <form className="loginfrom" onSubmit={submit}>
            <div className="text1" style={{ padding: "10px 0" }}>
              <h5 style={{ margin: "0" }}>Start your journey</h5>
              <h3 style={{ fontWeight: "bold", color: "black" }}>
                Sign up to the App
              </h3>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" id="formName" className="form-control" value={name} onChange={e=> setName(e.target.value)} />
              <label className="form-label" for="fromName">
                Name
              </label>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="fromEmail" className="form-control" value={email} onChange={e=> setEmail(e.target.value)} />
              <label className="form-label" for="fromEmail">
                E-mail
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="password" id="fromPassword" className="form-control" value={password} onChange={e=> setPassword(e.target.value)}
              />
              <label className="form-label" for="fromPassword">
                Password
              </label>
            </div>
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form1Example3" defaultChecked/>
                <label className="form-check-label" htmlFor="form1Example3">
                  Remember me
                </label>
              </div>
            </div>
            <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Sign up</button>
          </form>
          <p className="linkSignorLog">
            <span>Do you have an account? <a href="/login">Log in</a></span>
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
