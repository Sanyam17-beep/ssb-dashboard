import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import "./App.css"
import svglogo from "./Primarygreen.svg"
const GoogleSheetTable = () => {
  const [sheetData, setSheetData] = useState([]);
  const [data, setData] = useState([]);
  const sheetId = '1ycRF0FzOub85paiJEvQJKpYSG0RJ1_Et06tRHjoGnEs';
  const apiKey = 'AIzaSyCU1RTPeMzsrxKTJ9vD6hxxMgJtY17vxjQ'; // Replace with your Google Sheets API key
  const sheetName = 'Sheet1'; // Replace with your sheet name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const values = data.values || [];
        setSheetData(values);
        setData(values.slice(1)); // Skip the first row (headers)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sheetId, apiKey, sheetName]);

  const columns = React.useMemo(
    () =>
      sheetData.length > 0
        ? sheetData[0].map((col, index) => ({
            Header: col,
            accessor: String(index), // Using column index as accessor
          }))
        : [],
    [sheetData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="container">
      <div className="Navbar"><img src={svglogo} alt="" width={120} />  <div className="search-box">
        <label>
          
          <input
            value={state.globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="search"
          />
        </label>
      </div></div>
    
      <table {...getTableProps()} style={{ marginTop: '10px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GoogleSheetTable;
