import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 , color : 'red' },
  { field: 'firstName', headerName: 'First name', width: 160 },
  { field: 'lastName', headerName: 'Last name', width: 160 },
  { field: 'checkedIn', headerName: 'Checked In', width: 160 },
  { field: 'checkedOut', headerName: 'checked Out', width: 160 ,  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 120,
  },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },

];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' ,}}>
      <DataGrid
      sx={{backgroundColor: 'whitesmoke' , fontWeight : 'bold'}}
        rows={rows}
        columns={columns}
        TablePagination={" "}
    
      />
    </div>
  );
}