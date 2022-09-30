import { useEffect } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { createComment, initComment } from "../reducers/commentReducer";
import { increaseLike, deleteBlog } from "../reducers/blogReducer";
import { blogNotific } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  // const [button, setButton] = useState("view");
  // const [visible, setVisible] = useState(false);
  // const [blogObj, setBlogObj] = useState(blog);

  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment);

  useEffect(() => {
    if (!blog) {
      return undefined;
    }
    dispatch(initComment(blog.id));
  }, [dispatch, blog]);
  // const showWhenVisible = { display: visible ? "" : "none" };

  // const toggleVisibility = () => {
  //   setVisible(!visible);
  // };

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

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
  if (!blog) {
    return null;
  }
  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(createComment(comment, blog.id));

    return comment;
  };

  return (
    <div>
      <div
      // style={blogStyle} className="blog-list"
      >
        {/* <div id="blogshown"> */}
        {/* <button
          type="submit"
          onClick={() => {
            button === "hide" ? setButton("view") : setButton("hide");
            toggleVisibility();
          }}
        >
          {button}
        </button> */}
        {/* </div> */}
        {/* <div
         style={showWhenVisible}
        className="togglableForm"
      > */}
        <h1>
          {blog.title} {blog.author}
        </h1>
        <a href="blog.url">{blog.url}</a>
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
        {/* </div> */}
      </div>

      <div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <div>
            <input
              type="text"
              name="comment"
              // value={comment}
              // onChange={({ target }) => setCom(target.value)}
            />
            &nbsp;
            <button>
              <strong>add comment</strong>
            </button>
          </div>
        </form>
        {comment.map((c) => {
          return <li key={c.id}>{c.comment}</li>;
        })}
      </div>
    </div>
  );
  // );
};

Blog.propTypes = {
  // updateFunc: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  // deleteFunc: PropTypes.func.isRequired,
};

export default Blog;
