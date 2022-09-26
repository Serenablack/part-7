import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import Users from "./components/Users";

import { initializeBlog } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/authorizeReducer";
import { initializeUsers } from "./reducers/userReducer";

// eslint-disable-next-line no-unused-vars
import { Routes, Route, useParams, Link } from "react-router-dom";

// import { blogNotific } from "./reducers/notificationReducer";

// import blogService from "./services/blogs";
// import loginService from "./services/login";

import "./index.css";

const App = () => {
  // const [blogs, setBlogs] = useState([]);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  // const [alertStat, setStat] = useState("");

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.authorize);
  const users = useSelector((state) => state.users);

  // const user = useSelector((state) => state.authorize);

  useEffect(() => {
    dispatch(initializeBlog());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password,
  //     });

  //     window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  //     // setUser(user);
  //     // setUsername("");
  //     // setPassword("");
  //     dispatch(login)
  //   } catch (exception) {
  //     dispatch(blogNotific("Wrong credentials", "error", 3000));
  //     // setStat("error");
  //   }
  // };

  // const updateFunc = async (blogLikes) => {
  //   try {
  //     const updatedBlog = await blogService.update(blogLikes);

  //     dispatch(
  //       blogNotific(
  //         `Thank you for ${blogLikes.likes} on ${blogLikes.title}`,
  //         "success",
  //         4000
  //       )
  //     );
  //     // setBlogs(
  //     //   blogs.map((blog) =>
  //     //     blog.id !== blogLikes.id ? blog : updatedBlog.data
  //     //   )
  //     // );
  //     // setStat("success");
  //     // setTimeout(() => setMessage(null), 4000);
  //   } catch (error) {
  //     dispatch(blogNotific(error.response.data.error, "error", 4000));

  //     // setMessage(error.response.data.error);
  //     // setTimeout(() => setMessage(null), 4000);
  //   }
  // };

  // const deleteFunc = async (blogDelete) => {
  //   try {
  //     if (
  //       window.confirm(
  //         `Do you really want to remove blog ${blogDelete.title} by ${blogDelete.author}`
  //       )
  //     ) {
  //       await blogService.remove(blogDelete);
  //       dispatch(blogNotific(` ${blogDelete.title} deleted`, "error", 4000));

  //       // setMessage(` ${blogDelete.title} deleted`);

  //       // setBlogs(blogs.filter((blog) => blog.id !== blogDelete.id));

  //       // setStat("error");
  //       // setTimeout(() => setMessage(null), 4000);
  //     }
  //   } catch (error) {
  //     dispatch(blogNotific(error.response.data.error, "error", 4000));

  //     // setMessage(error.response.data.error);
  //     // setTimeout(() => setMessage(null), 4000);
  //   }
  // };

  return (
    <div className="container">
      <h2>blogs</h2>

      {user === null ? (
        <div>
          <Notification />
          <LoginForm
          // handleLogin={handleLogin}
          // username={username}
          // setUsername={setUsername}
          // setPassword={setPassword}
          // password={password}
          />
        </div>
      ) : (
        <div>
          <p>{user.username} logged in</p>
          {/* <Routes> */}
          {/* <Route path="/api/users" element={<Users />}></Route>
            <Route path="/users/:id"></Route> */}
          {/* <Route path=></Route> */}
          {/* </Routes> */}
          <button
            type="logout"
            onClick={() => {
              // handleLogout();
              dispatch(logout());
              // window.localStorage.removeItem("loggedBlogappUser");
              // setUser(null);
            }}
          >
            logout
          </button>
          <div>
            <Link style={padding} to="/blogs">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
          </div>
          <Routes>
            <Route path="/users" element={<Users users={users} />} />

            <Route path="/blogs" element={<BlogList blogs={blogs} />} />
            {/* <Route path="/" element={<Home />} /> */}
          </Routes>
          <Route path="/blogs" element={<BlogList blogs={blogs} />} />
        </div>
      )}
    </div>
  );
};

export default App;
