// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default apiClient;


import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://restaurant-production-f0e2.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

