import React from "react"
import Tr from "./Tr";

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {tableData.map((_, idx) => <Tr key={idx} dispatch={dispatch} rowIndex={idx} rowData={tableData[idx]}>{``}</Tr>)}
        {/* {Array(tableData.length).fill('').map((_, idx) => <Tr key={idx} rowData={tableData[idx]}>{``}</Tr>)} */}
      </tbody>
    </table>
  )
}

export default Table;