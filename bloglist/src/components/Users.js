// import { useDispatch, useSelector } from "react-redux";
const Users = ({ users }) => {
  // const dispatch=useDispatch()
  // return users.map((user) => {

  // })
  console.log(users);
  if (!users) {
    return null;
  }
  // return <h1>hey</h1>;
  return (
    <table className="table">
      <tr>
        <th>users</th>
        <th>blogs created</th>
      </tr>

      {users.map((user) => (
        <div key={user.id}>
          <tr>
            <td> {user.username} </td>
            <td>{user.blogs.length}</td>
          </tr>
        </div>
      ))}
    </table>
  );
};
export default Users;
