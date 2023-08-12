export interface IExpenseDTO {
  expenseId: string | null;
  userId: string;
  description: string;
  amount: number;
  date: string;
  tags: string[];
};