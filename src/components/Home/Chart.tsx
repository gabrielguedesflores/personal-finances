import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import { IExpenseDTO } from '../../dto/Expense.dto';

function generateChartData(expenses: any[]) {
  return expenses.map((expense, index) => ({
    time: `${index + 1}`,
    amount: expense.amount,
  }));
}

const Chart: React.FC<{ expenses: IExpenseDTO[] }> = ({ expenses }) => {
  const theme = useTheme();
  const chartData = generateChartData(expenses);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Despesas Mensais
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Valor (R$)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart;
