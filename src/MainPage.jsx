import Table from "./table"
import Breadcrumbs from "./Breadcrumbs"
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

export default function MainPage() {
    return(
        <MDBContainer fluid className="align-items-center" style={{height: "100vh" , padding: "10px" , }}>
            <MDBRow style={{height: "30px" , position: "relative"}}><Breadcrumbs></Breadcrumbs></MDBRow>
            <MDBRow><Table/></MDBRow>
        </MDBContainer>
    )
}