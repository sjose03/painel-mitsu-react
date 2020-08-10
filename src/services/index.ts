import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://painel-mitchel-2020.herokuapp.com',
});
