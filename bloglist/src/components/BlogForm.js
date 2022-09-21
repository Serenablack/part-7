import { React, useRef } from "react";
// import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { blogNotific } from "../reducers/notificationReducer";

import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ blog }) => {
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const blogformRef = useRef();
  const blogAdd = async (event) => {
    event.preventDefault();
    try {
      const title = event.target.title.value;
      const url = event.target.url.value;
      const author = event.target.author.value;

      event.target.title.value = "";
      event.target.url.value = "";
      event.target.author.value = "";

      console.log({ title, url, author });
      const blogtoCreate = { title, url, author };

      dispatch(createBlog(blogtoCreate));
      dispatch(
        blogNotific(
          `New blog ${blog.title} by ${blog.author} was successfully added.`,
          "success",
          4000
        )
      );
      // setStat("success");
      // setTimeout(() => setMessage(null), 4000);

      // setBlogs([...blogs, addedBlog.data]);
      blogformRef.current.toggleVisibility();
    } catch (error) {
      // console.log(error);
      dispatch(blogNotific("error", "error", 3000));

      // setMessage(error.response.data.error);
      // setTimeout(() => setMessage(null), 4000);
    }

    // before using redux and passing addfunc as prop to component blog

    // addfunc({
    //   title,
    //   url,
    //   author,
    // });
    // setAuthor("");
    // setTitle("");
    // setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={blogAdd}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="title"
            // value={title}
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            id="url"
            // value={url}
            // onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            // value={author}
            // onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <button
          id="create-button"
          onClick={() => {
            "clicked";
          }}
        >
          create
        </button>
      </form>
    </div>
  );
};

// BlogForm.propTypes = {
//   title: PropTypes.func.isRequired,
// };

export default BlogForm;
