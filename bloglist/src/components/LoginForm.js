// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authorizeReducer";
import { initializeBlog } from "../reducers/blogReducer";

import { Form, Button } from "react-bootstrap";

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
      event.preventDefault();

      const username = event.target.username.value;
      const password = event.target.password.value;
      event.target.username.value = "";
      event.target.password.value = "";
      dispatch(login(username, password));
      dispatch(initializeBlog());

      // setUser(user);
      // setUsername("");
      // setPassword("");

      // setStat("error");
    };

    return (
      <form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            // value={username}
            name="username"
            // onChange={({ target }) => setUsername(target.value)}
          />
          password
          <Form.Control
            id="password"
            // value={password}
            name="password"
            // onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            variant="primary"
            type="submit"
            border="10px solid white
            login"
          >
            login
          </Button>
        </Form.Group>
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
