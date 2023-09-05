import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { getExpenses, postExpenses, updateExpense, deleteExpense } from '../../api/fetchExpenses';
import { AuthContext } from '../../contexts/AuthProvider';
import { IExpenseDTO } from '../../dto/Expense.dto';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    // Criar uma nova linha vazia com o ID gerado aleatoriamente
    const newEmptyRow = {
      id,
      description: '',
      amount: 0,
      date: new Date().toISOString(),
      tags: '',
      isNew: true,
    };
    // Adicionar a nova linha ao estado das linhas
    setRows((oldRows) => [...oldRows, newEmptyRow]);
    // Definir o modo de edição para a nova linha, focando no campo de descrição
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'description' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Adicionar Despesa
      </Button>
    </GridToolbarContainer>
  );
}

export default function ExpenseTable(): React.JSX.Element {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const expenses = await getExpenses(user.userId);
          const transformedExpenses = expenses.map((expense: { expenseId: any; }) => ({
            ...expense,
            id: expense.expenseId,
            isNew: false,
          }));

          setRows(transformedExpenses);
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    try {
      const editedRow = rows.find((row) => row.id === id);
      console.log('editedRow', editedRow);

      if (!editedRow) {
        // Lidar com o caso em que a linha editada não foi encontrada
        return;
      }

      const newExpense: IExpenseDTO = {
        expenseId: editedRow.expenseId,
        userId: editedRow.userId,
        description: editedRow.description,
        amount: parseFloat(editedRow.amount as string), // Certifique-se de converter para número
        date: editedRow.date,
        tags: editedRow.tags,
      };

      if (editedRow.isNew) {
        // Se for uma nova despesa, crie-a
        const createdExpense = await postExpenses(newExpense);
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, ...createdExpense, isNew: false } : row
        );
        setRows(updatedRows);
      } else {
        // Se não for uma nova despesa, atualize-a
        await updateExpense(newExpense);
      }

      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      // Lide com o erro
      console.error('Erro ao salvar despesa:', error);
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteExpense(id);
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      // Handle error
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'description', headerName: 'Descrição', width: 220, editable: true },
    {
      field: 'amount',
      headerName: 'Valor',
      type: 'number',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Data',
      type: 'date',
      width: 180,
      editable: true,
      valueGetter: (params) => new Date(params.row.date), // Transform the date string into a Date object
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 220,
      editable: true,
      renderCell: (params): any => (
        <>{Array.isArray(params.value) ? params.value.join(', ') : params.value}</>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 140,
      cellClassName: 'actions',
      getActions: ({ id }): any | React.ReactNode => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
              />
            </>
          ];
        }

        return [
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={handleEditClick(id)}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
            />
          </>
        ];
      }
    }
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar, // Adicione essa linha para usar a função EditToolbar
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
