import React, { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // Fetch assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await AssessmentService.getList();
        if (Array.isArray(data)) {
          setAssessments(data);
        }
      } catch (err) {
        console.error(`Failed to fetch assessments:`, err.message);
      }
    };
    fetchAssessments();
  }, []);

  // table columns
  const columns = useMemo(
    () => [
      { Header: `ID`, accessor: `id` },
      { Header: `Cat Name`, accessor: `catName` },
      { Header: `Date of Birth`, accessor: `catDateOfBirth` },
      { Header: `Score`, accessor: `score` },
      { Header: `Risk Level`, accessor: `riskLevel` },
      { Header: `Instrument`, accessor: `instrumentType` },
      { Header: `Created At`, accessor: `createdAt` },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: assessments }, useSortBy);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = tableInstance;

  if (!Array.isArray(assessments)) {
    return <div>Loading assessments...</div>;
  }

  return (
    <div className="container mt-4">
      <h4>Assessment List</h4>
      <table {...getTableProps()} className="table table-bordered">
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>)}
            </tr>)}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.length === 0 ?
            <tr>
              <td colSpan={columns.length} className="text-center">No assessments found.</td>
            </tr> :
            rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell =>
                    <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
