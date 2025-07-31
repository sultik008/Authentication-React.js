import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ForgotPassword from "./forgotPassword.jsx";
import MainPage from './MainPage.jsx'
import LogIn from "./login.jsx";
import SignUp from "./signUp.jsx";
import { Router , Routes , Route} from 'react-router-dom'

function App() {
 return(
 <Router >
  <Routes>
    <Route path="/login" element={<LogIn />} ></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/" element={<MainPage/>}></Route>
    <Route path="/forgot" element={<ForgotPassword/>}></Route>
  </Routes>
 </Router>
 )
}

export default App;
