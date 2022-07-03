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

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
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
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const allBlogs = await axios.get(baseUrl);
  const oldObj = allBlogs.data.find((blog) => blog.id === id);
  const newObj = {
    ...oldObj,
    likes: oldObj.likes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, newObj, config);
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

const addComment = async (id, newObj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    newObj,
    config
  );
  return response.data;
};

export default {
  getAll,
  getOne,
  setToken,
  create,
  update,
  likeBlog,
  deleteBlog,
  addComment,
};
