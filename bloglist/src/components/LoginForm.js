import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authorizeReducer";
import { blogNotific } from "../reducers/notificationReducer";

const LoginForm = () =>
  //   {
  //   handleLogin,
  //   username,
  //   setUsername,
  //   password,
  //   setPassword,
  // }
  {
    const dispatch = useDispatch();
    const handleLogin = async (event) => {
      try {
        event.preventDefault();

        const username = event.target.Username.value;
        const password = event.target.Password.value;
        event.target.Username.value = "";
        event.target.Password.value = "";

        // setUser(user);
        // setUsername("");
        // setPassword("");
        dispatch(login(username, password));
      } catch (exception) {
        dispatch(blogNotific("Wrong credentials", "error", 3000));
        // setStat("error");
      }
    };

    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            // value={username}
            name="Username"
            // onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            // value={password}
            name="Password"
            // onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="submit">login</button>
      </form>
    );
  };

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   handleLogin: PropTypes.func.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   setPassword: PropTypes.func.isRequired,
// };

export default LoginForm;
