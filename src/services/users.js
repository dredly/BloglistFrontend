import axios from "axios";
const baseUrl = "/api/users";

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getOne };
