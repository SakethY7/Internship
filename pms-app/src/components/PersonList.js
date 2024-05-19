import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './PersonList.css'; // Import the CSS file

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the persons!', error);
      });
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Mobile Number',
      accessor: 'mobileNumber',
    },
    {
      Header: 'Date of Birth',
      accessor: 'dateOfBirth',
      Cell: ({ value }) => moment(value).format('DD-MM-YYYY'),
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="actions">
          <button className="edit" onClick={() => handleEdit(row)}>Edit</button>
          <button className="delete" onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data: persons,
    },
    useSortBy
  );

  const handleEdit = (row) => {
    navigate(`/edit/${row.original.id}`);
  };

  const handleDelete = async (row) => {
    const personId = row.original.id;
    try {
      await axios.delete(`http://localhost:3000/persons/${personId}`);
      setPersons(prevPersons => prevPersons.filter(person => person.id !== personId));
      console.log('Person deleted successfully:', personId);
    } catch (error) {
      console.error('There was an error deleting the person:', error);
    }
  };

  return (
    <div className="person-list-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
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

export default PersonList;
