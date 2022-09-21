import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlog } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/authorizeReducer";

// import { Routes, Route, useParams, Link } from "react-router-dom";

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

  const blogformRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.authorize);

  // const user = useSelector((state) => state.authorize);

  useEffect(() => {
    dispatch(initializeBlog());
    dispatch(initializeUser());
  }, [dispatch]);

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

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={blogformRef}>
        <BlogForm />
      </Togglable>
    );
  };
  // const blogLikes = (a, b) => b.likes - a.likes;

  return (
    <div className="container">
      <h2>blogs</h2>
      {/* <Routes>
      <Route path="/users/:id"></Route>
      </Routes> */}
      <Notification />
      {user === null ? (
        <LoginForm
        // handleLogin={handleLogin}
        // username={username}
        // setUsername={setUsername}
        // setPassword={setPassword}
        // password={password}
        />
      ) : (
        <div>
          {user.name} logged in
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
          {blogForm()}
          {/* .sort(blogLikes) */}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              // updateFunc={updateFunc}
              // deleteFunc={deleteFunc}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
