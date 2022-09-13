import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [alertStat, setStat] = useState("");

  const blogformRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong credentials");
      setStat("error");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const addFunc = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog);
      setMessage(
        `New blog ${blog.title} by ${blog.author} was successfully added.`
      );
      setStat("success");
      setTimeout(() => setMessage(null), 4000);
      setBlogs([...blogs, addedBlog.data]);
      blogformRef.current.toggleVisibility();
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const updateFunc = async (blogLikes) => {
    try {
      const updatedBlog = await blogService.update(blogLikes);

      setMessage(`Thank you for ${blogLikes.likes} on ${blogLikes.title}`);
      setBlogs(
        blogs.map((blog) =>
          blog.id !== blogLikes.id ? blog : updatedBlog.data
        )
      );
      setStat("success");
      setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const deleteFunc = async (blogDelete) => {
    try {
      if (
        window.confirm(
          `Do you really want to remove blog ${blogDelete.title} by ${blogDelete.author}`
        )
      ) {
        await blogService.remove(blogDelete);
        setMessage(` ${blogDelete.title} deleted`);

        setBlogs(blogs.filter((blog) => blog.id !== blogDelete.id));

        setStat("error");
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={blogformRef}>
        <BlogForm addfunc={addFunc} />
      </Togglable>
    );
  };
  const blogLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification alertStat={alertStat} message={message} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      ) : (
        <div>
          {user.name} logged in
          <button
            type="logout"
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              setUser(null);
            }}
          >
            logout
          </button>
          {blogForm()}
          {blogs.sort(blogLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateFunc={updateFunc}
              deleteFunc={deleteFunc}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
