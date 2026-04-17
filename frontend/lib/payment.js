import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../config/api';

const PAYMENT_URL = `${API_BASE_URL}/fyter/payments`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${Cookies.get('access_token')}`,
});

export const createPayment = async (paymentData) => {
  const response = await axios.post(`${PAYMENT_URL}/create/`, paymentData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const getMyPayments = async () => {
  const response = await axios.get(`${PAYMENT_URL}/my/`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const enrollCourse = async (enrollData) => {
  const response = await axios.post(`${PAYMENT_URL}/enroll-course/`, enrollData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const getMySkillPoints = async () => {
  const response = await axios.get(`${PAYMENT_URL}/my-skill-points/`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const addSkillPoint = async () => {
  const response = await axios.post(`${PAYMENT_URL}/add-skill-point/`, {}, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};