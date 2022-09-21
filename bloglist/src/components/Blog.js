import { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { increaseLike, deleteBlog } from "../reducers/blogReducer";
import { blogNotific } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const [button, setButton] = useState("view");
  const [visible, setVisible] = useState(false);
  // const [blogObj, setBlogObj] = useState(blog);

  const dispatch = useDispatch();

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = () => {
    // const updatedBlog = {
    //   ...blog,
    //   likes: blog.likes + 1,
    // };
    dispatch(increaseLike(blog));
    dispatch(
      blogNotific(
        `Thank you for ${blog.likes} on ${blog.title}`,
        "success",
        4000
      )
    );
    // updateFunc(updatedBlog);
    // setBlogObj(updatedBlog);
  };

  const removeBlog = () => {
    try {
      if (
        window.confirm(
          `Do you really want to remove blog ${blog.title} by ${blog.author}`
        )
      ) {
        dispatch(deleteBlog(blog));
        dispatch(blogNotific(` ${blog.title} deleted`, "error", 4000));
      }
    } catch (error) {
      dispatch(blogNotific(error.response.data.error, "error", 4000));
    }

    // deleteFunc(blog);
  };

  return (
    <div style={blogStyle} className="blog-list">
      <div id="blogshown">
        {blog.title} {blog.author}
        <button
          type="submit"
          onClick={() => {
            button === "hide" ? setButton("view") : setButton("hide");
            toggleVisibility();
          }}
        >
          {button}
        </button>
      </div>

      <div style={showWhenVisible} className="togglableForm">
        <p>{blog.url}</p>
        <p>
          {/* {blogObj.likes} */}
          {blog.likes}

          <button id="like-button" onClick={increaseLikes}>
            like
          </button>
        </p>
        {/* <p>{blogObj.user.username}</p> */}
        <div>
          <button id="remove-button" onClick={removeBlog}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  // updateFunc: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  // deleteFunc: PropTypes.func.isRequired,
};

export default Blog;
