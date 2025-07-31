import { useState , useEffect} from "react";
import { getUsers , block , unBlock , deleteUsers} from "./queries";
import { useNavigate } from "react-router-dom";
import './table.css'


export default function Table() {
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState([]);
  const [selectAll, setSelectAll] = useState(false); 
  const navigate = useNavigate()
  async function fetchData() {
    try {
      let data = await getUsers()
      setUsers(data.data);
    } catch (e) {
      navigate('/login')
    }
  }
  useEffect(() => {fetchData()},[])
  function onFlag(id) {
    if (!flag.includes(id)) {setFlag([...flag, id])}
    else {setFlag(flag.filter((f) => f !== id))}
  }
  function handleSelectAll(e) {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      setFlag(users.map((u) => u.userid));
    } else {
      setFlag([]);
    }
  }
  async function submitBlock() {
    try {
      const res = await block(flag)
      alert(res.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  async function submitUnBlock() {
    try {
      const res = await unBlock(flag)
      alert(res.data.message)
      await fetchData();
      setFlag([]);
      setSelectAll(false);
    } catch (e) {
      console.log(e)
    }
  }
  async function submitDelete() {
    try {
      const res = await deleteUsers(flag)
      await fetchData()
      alert(res.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="TableContainer" >
      <div className="toolbar">
        <div className="btns">
          <button className="btn btn-outline-danger" data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={submitBlock}>Block</button>
          <button className="btn btn-outline-success" data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={submitUnBlock}>Unblock</button>
          <button className="btn btn-outline-primary" data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={submitDelete} >delete</button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAllCheckbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Last seen</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, i) => (
              <tr key={i}>
                <th scope="row">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={flag.includes(user.userid)}
                    onChange={() => onFlag(user.userid)}
                  />
                </th>
                <td>{user.name || 'Noname'}</td>
                <td>{user.email}</td>
                <td>{user.lasttime}</td>
                <td>{user.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}