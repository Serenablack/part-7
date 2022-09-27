const User = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};
export default User;
