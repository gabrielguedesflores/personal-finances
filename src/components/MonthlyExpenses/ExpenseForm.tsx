import React from 'react';
import { IExpenseDTO } from '../../dto/Expense.dto';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { DatePicker, DateRangeIcon } from '@mui/x-date-pickers';
import { IExpensesFormPropsDTO } from '../../dto/ExpensesFormProps.dto';

const ExpensesForm: React.FC<IExpensesFormPropsDTO> = ({ user }) => {
  const [inputExpenseName, setInputExpenseName] = React.useState<string>('Despesa');
  const [inputSelectedMonth, setInputSelectedMonth] = React.useState<Date | null>();
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<IExpenseDTO[]>([]);
  const [inputAmount, setInputAmount] = React.useState<number>(0);
  const nextIdRef = React.useRef(1);

  const handleAddExpense = () => {
    if (inputAmount <= 0 || !inputSelectedMonth || !inputExpenseName) {
      alert('Preencha todos os campos');
      return;
    }

    const newExpense: IExpenseDTO = {
      expenseId: 'new-expense-' + nextIdRef.current,
      userId: user!.userId,
      description: inputExpenseName,
      amount: inputAmount,
      date: inputSelectedMonth!.toISOString(),
      tags: [],
    };

    setMonthlyExpenses([...monthlyExpenses, newExpense]);
    setInputAmount(0);
    setInputExpenseName('');
    nextIdRef.current += 1;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Descrição</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">#</InputAdornment>}
          label="Descrição"
          value={inputExpenseName}
          onChange={(e) => setInputExpenseName(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Valor"
          value={inputAmount}
          onChange={(e) => setInputAmount(Number(e.target.value))}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="month-year-picker"></InputLabel>
        <DatePicker
          label="Mês/Ano"
          views={['month', 'year']}
          value={inputSelectedMonth}
          onChange={setInputSelectedMonth}
        />
      </FormControl>

      <Button variant="contained" onClick={handleAddExpense}>
        Adicionar
      </Button>
    </Box>
  );
};

export default ExpensesForm;
