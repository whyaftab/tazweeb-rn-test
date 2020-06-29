import Axios from 'axios';

export const login = (email, password) =>
  Axios.post('login', {email, password});

export const getSellers = (name = '') => Axios.get(`sellers?name=${name}`);

export const sendAppointmentRequest = (time) =>
  Axios.post(`appointment`, {time});

export const getAppointments = (name = '') => Axios.get(`appointment`);
