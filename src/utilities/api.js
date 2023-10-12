import axios from "axios";

// const token = localStorage.getItem('token');

const http = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  //   headers: {        
  //      'Content-Type' : 'application/json',
  //      'Authorization': `Bearer ${token}`,
  // }  
});
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;