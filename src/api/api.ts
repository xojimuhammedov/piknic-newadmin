// api.ts

import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/setting/category`); 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}; 
