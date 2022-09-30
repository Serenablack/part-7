// import { useDispatch, useSelector } from "react-redux";
import {
  // BrowserRouter as Router, Routes, Route,
  Link,
} from "react-router-dom";
import { Table } from "react-bootstrap";

import "../index.css";

const Users = ({ users }) => {
  // const dispatch=useDispatch()
  // return users.map((user) => {

  // })

  if (!users) {
    return null;
  }
  // return <h1>hey</h1>;
  return (
    <>
      <h1>Users</h1>
      <Table striped className="table">
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.username}</Link>
              </td>

              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default Users;
