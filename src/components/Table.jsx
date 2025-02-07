import React from "react";
import "../styles/components/table.css";
function Table({ headers, rows, data }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((dataCol, index) => (
              <tr key={index}>
                <td>
                  <img src={dataCol.signedUrl} alt={dataCol.name} />
                </td>
                {rows.map((rowData, rowIndex) => (
                  <td key={rowIndex}>
                    {dataCol[rowData] || "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No content available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
