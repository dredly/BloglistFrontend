import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id, newObj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObj, config);
  return response.data;
};

const likeBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const oldObj = response.data;
  const newObj = {
    ...oldObj,
    likes: oldObj.likes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, newObj);
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, create, update, likeBlog, deleteBlog };
