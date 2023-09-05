import axios from 'axios';
import { IExpenseDTO } from '../dto/Expense.dto';

const API_BASE_URL = 'http://localhost:8080/api'

export const getExpenses = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses/v1/user/${userId}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly expenses:', error);
    return [];
  }
};

export const postExpenses = async (expense: any) => {
  const newExpense = {
    userId: expense!.userId,
    description: expense!.description,
    amount: expense!.amount,
    date: new Date(expense!.date),
    tags: expense!.tags,
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses/v1/expense`, newExpense);
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly expenses:', error);
    return [];
  }
};

export const updateExpense = async (expense: IExpenseDTO) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/expenses/v1/expense/${expense.expenseId}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (expenseId: any) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/expenses/v1/expense/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};