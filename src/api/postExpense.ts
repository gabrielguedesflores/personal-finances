import axios from 'axios';
import { IExpenseDTO } from '../dto/Expense.dto';

export const postExpenses = async (expense: IExpenseDTO) => {
  const newExpense = {
    userId: expense!.userId,
    description: expense!.description,
    amount: expense!.amount,
    date: new Date(expense!.date),
    tags: [
      "tag1", "tag2", "tag3"
    ],
  }
  try {
    const response = await axios.post(`http://localhost:8080/api/expenses/v1/expense`, newExpense);
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly expenses:', error);
    return [];
  }
};
