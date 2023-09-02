import React from 'react';
import { IExpenseDTO } from '../../dto/Expense.dto';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { DatePicker, DateRangeIcon } from '@mui/x-date-pickers';
import { IExpensesFormPropsDTO } from '../../dto/ExpensesFormProps.dto';
import { postExpenses } from '../../api/postExpense';
import { NumericFormat } from 'react-number-format';

const ExpensesForm: React.FC<IExpensesFormPropsDTO> = ({ user, onExpenseAdded }) => {
  const [inputExpenseName, setInputExpenseName] = React.useState<string>('');
  const [inputSelectedMonth, setInputSelectedMonth] = React.useState<any>('01/08/2023');
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<IExpenseDTO[]>([]);
  const [inputAmount, setInputAmount] = React.useState<number>(0.00);
  const nextIdRef = React.useRef(1);

  const handleAddExpense = async () => {
    if (!inputExpenseName || !inputAmount || !inputSelectedMonth) {
      alert('Preencha todos os campos');
      return;
    }

    const newExpense: IExpenseDTO = {
      expenseId: null,
      userId: user!.userId,
      description: inputExpenseName!,
      amount: inputAmount!,
      date: inputSelectedMonth!,
      tags: [],
    };

    const responseExpense = await postExpenses(newExpense);
    if (responseExpense) {
      onExpenseAdded(newExpense); 
    }
    setMonthlyExpenses([...monthlyExpenses, newExpense]);
    setInputAmount(0);
    setInputExpenseName('');
    nextIdRef.current += 1;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Verifica se o valor é um número decimal válido
    if (/^\d+(\.\d{0,2})?$/.test(input)) {
      setInputAmount(Number(input));
    }
  };

  const button = () => (
    <OutlinedInput
      id="outlined-adornment-amount"
      startAdornment={<InputAdornment position="start">$</InputAdornment>}
      label="Valor"
      value={inputAmount}
      onChange={handleAmountChange}
    />
  )

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
        <NumericFormat 
          value={inputAmount}
          customInput={button} 
          thousandSeparator={true}
          decimalSeparator="."
          prefix="$"
        />
        {/* <NumericFormat
          id="outlined-adornment-amount"
          customInput={OutlinedInput}
          thousandSeparator={true}
          decimalSeparator="."
          prefix="$"
          label="Valor"
          value={inputAmount}
          onValueChange={(values) => handleAmountChange(values.floatValue || 0)}
          allowNegative={false}
          decimalScale={2}
        /> */}
        {/* <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Valor"
          value={inputAmount}
          onChange={handleAmountChange}
        /> */}
      </FormControl>

      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="month-year-picker">Mês/Ano</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start"></InputAdornment>}
          label="Date"
          disabled
          value={inputSelectedMonth}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            setInputSelectedMonth(selectedDate);
          }}
        />
      </FormControl>

      {/* <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="month-year-picker">Mês/Ano</InputLabel>
        <DatePicker
          label="Mês/Ano"
          views={['month', 'year']}
          value={inputSelectedMonth}
          onChange={setInputSelectedMonth}
        />
      </FormControl> */}

      <Button variant="contained" onClick={handleAddExpense}>
        Adicionar
      </Button>
    </Box>
  );
};

export default ExpensesForm;
