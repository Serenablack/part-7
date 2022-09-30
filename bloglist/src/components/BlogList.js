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
    marginTop: 6,
    textAlign: "center",
    paddingTop: 2,
    paddingLeft: 2,
    border: "solid",
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 6,
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
