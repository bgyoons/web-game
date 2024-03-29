import React, { memo } from "react"
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length).fill('').map((_, i) => <Td dispatch={dispatch} key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{``}</Td>)}
    </tr>
  )
})

export default Tr;