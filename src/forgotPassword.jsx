import { MDBContainer, MDBCol } from "mdb-react-ui-kit";
import Breadcrumbs from "./Breadcrumbs";

export default function ForgotPassword() {
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "white",
        padding: "0",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center"
      }}
    >
      <Breadcrumbs></Breadcrumbs>
      <MDBCol md={6}>
        <h3  style={{textAlign: "center"}}>Forgot Password?</h3>
        <h2 style={{textAlign: "center"}}>Connect with Administration</h2>
        <a
          class="btn btn-primary btn-block"
          href="mailto:sultanbekzumamuratov@gmail.com"
        >
          connect
        </a>
      </MDBCol>
    </MDBContainer>
  );
}
