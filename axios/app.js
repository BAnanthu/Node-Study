// Promise based HTTP client for the browser and node.js
const axios = require('axios');

// Make a request for a user with a given ID
// axios.get('https://reqres.in/api/users?page=2')
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//     // console.log(response.data);
//     response.data.data.forEach(element => {
//         console.log(element.first_name)
//     });
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//     console.log("completed.");
//   });



// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//     try {
//       const response = await axios.get('https://reqres.in/api/users');
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getUser()






axios.post('https://reqres.in/api/users', {
    "name": "morpheus10",
    "job": "leader11"
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.put('https://reqres.in/api/users/2', {
    "name": "morpheus2",
    "job": "leader2"
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });



const FormData = require('form-data');
const fs = require('fs');
const { config } = require('process');

async function runn() {
    const formData = new FormData();
    formData.append('id', 1);
    formData.append('string', 'Text we want to add to the submit');
    formData.append('pic', fs.createReadStream('D:/nodejs/Node-Study/axios/download.jpg'));

    const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: formData.getHeaders()
    });
    console.log(res.data.files)
    console.log(res)
    res.data.files; // 'yinyang.png': an extremely long binary string

    res.data.form; // form: { id: '1', string: 'Text we want to add to the submit' }

    res.data.headers; // ↓
}
// Accept: 'application/json, text/plain, */*',
// 'Content-Length': '3352',
// 'Content-Type': 'multipart/form-data; boundary=--------------------------a string of numbers that is never the same',
// Host: 'httpbin.org',
// 'User-Agent': 'axios/0.19.2',
// 'X-Amzn-Trace-Id': 'Root=1-string of numbers and characters that are never the same-ditto'
runn()


// for Autherisation token passing etc


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


// interceptor eg:sending json web token as authorisation header
// this will be use by any axios requests
const apiUrl = 'https://reqres.in/api'
axios.interceptors.request.use(
    config => {
        config.headers.authorization =`Bearer ${accessToken}`
    }
)
await axios.get(`${apiUrl}/users`);





//   The Axios Instance
  const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  
//eg:
// here not all axios request wiill use accessToken
  const authAxios = axios.create({
    baseURL:apiUrl,
    timeout: 1000,
    headers: {
       Authorization: `Bearer ${accessToken}`}
  });

  await authAxios.get(`/users`);