import { useRef } from "react";
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

  return (
    <div>
      {blogForm()}
      {[...blogs].sort(blogLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // updateFunc={updateFunc}
          // deleteFunc={deleteFunc}
        />
      ))}
    </div>
  );
};
export default BlogList;
