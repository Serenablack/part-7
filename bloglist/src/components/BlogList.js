import { useRef } from "react";
import { Link } from "react-router-dom";

import Blog from "./Blog";
import BlogForm from "./BlogForm";

import Togglable from "./Togglable";

const BlogList = ({ blogs }) => {
  const blogformRef = useRef();

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={blogformRef}>
        <BlogForm />
      </Togglable>
    );
  };
  const blogLikes = (a, b) => b.likes - a.likes;

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 3,
  };

  return (
    <div>
      {blogForm()}

      {[...blogs].sort(blogLikes).map((blog) => {
        return (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blog/${blog.id}`}>
              <p>
                {blog.title} {blog.author}
              </p>
            </Link>
            {/* <Blog key={blog.id} blog={blog} /> */}
          </div>
        );
      })}
    </div>
  );
};
export default BlogList;
