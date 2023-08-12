import axios from 'axios';

export const getMonthlyExpenses = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/expenses/v1/user/${userId}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly expenses:', error);
    return [];
  }
};
