import React from "react";
import "../styles/components/table.css"
function Table({ headers }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  );
}

export default Table;
