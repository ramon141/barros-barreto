import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'; 
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minHeight: 10,
    minWidth: 'calc(100%)',
    [theme.breakpoints.up("lg")]: {
      minWidth: 150,
    },
  },
}));

export default function Table({ columns, data }) {
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

// Create a state
const [filterInput, setFilterInput] = useState("");

// Update the state when input changes
const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("email", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Pesquise um usuário pelo e-mail"}
      />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-table">
        <div className="pagination-number-pages">
          <FormControl variant="outlined" required className={classes.formControl}>
            <InputLabel id="Número de linhas: ">
              Número de linhas: 
            </InputLabel>

            <Select 
              onChange={e => {setPageSize(Number(e.target.value))}}
              variant="outlined"
              label="Número de linhas: "
              labelId="Número de linhas: " 
              value={pageSize}
              style={{'background':'#fff'}}
            >
              {[10, 15, 20, 25, 30].map(pageSize => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="pagination-buttons">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} style={{"marginLeft":"5px"}}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage} style={{"marginLeft":"5px"}}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage} style={{"marginLeft":"5px"}}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} style={{"marginLeft":"5px"}}>
            {'>>'}
          </button>{' '}

          <span style={{"marginLeft":"10px"}}>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
      </div>
    </div>
  );
}