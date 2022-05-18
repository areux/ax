import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'react-query';

import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#56daff',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Users(props: any) {
  const r = props.data.map((user: any) => (
    <StyledTableRow key={user.id}>
      <StyledTableCell style={{ width: 30 }}>{user.id}</StyledTableCell>
      <StyledTableCell style={{ width: 150 }}>{user.name}</StyledTableCell>
      <StyledTableCell>{user.company.catchPhrase}</StyledTableCell>
    </StyledTableRow>
  ));
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label="xtable" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell>name</StyledTableCell>
              <StyledTableCell>catch phrase</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {r}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function App() {
  const { isLoading, isError, error, data, isFetching } = useQuery("users", async () => {
    return (await fetch("https://jsonplaceholder.typicode.com/users")).json();
  });
  const fetched = !isLoading && !isError && !isFetching;

  return (
    <div className="App">
      <Container>
        {isLoading && <p>Loading...</p>}
        {isFetching && <p>Fetching...</p>}
        {isError && <p>error occured (check your internet connection?)</p>}
        {fetched === true && (<Users data={data} />)}
      </Container>
    </div>
  );
}

export default App;
