import axios from "axios";

const getAll = async () => {
  const request = await axios.get("/api/users");
  return request.data;
};
export default { getAll };
