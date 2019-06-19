import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-735c1.firebaseio.com/'
});

export default instance;
