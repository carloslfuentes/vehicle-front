import axios from 'axios';
const base = 'http://localhost:3000'
export const post = ({ url, data, headers }) => {
  return request({
    method: 'post',
    url: urlBase(url),
    data: data,
    headers: headers,
  });
};

export const get = ({ url, data, headers }) => {
  return request({
    method: 'get',
    url: urlBase(url),
    params: data,
    headers: headers,
  });
};

const urlBase =(url) =>{
  return `${base}${url}`
}

const request = ({ method, url, data, params, headers }) => {
  let newHeaders = Object.assign({}, headers);
  return axios({
    method: method,
    url: url,
    data: data,
    params: params,
    headers: newHeaders,
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {

    });
};
