import React from 'react';
import './table.css';

const Table = ({ headers, bodyTable, information }) => {
    return (
        <div className="general-container">
            {
                bodyTable.map((matrix, index) =>
                    <div className="table-container">
                        <h4>Simulación número: {index+1}</h4>
                        <h4>Información:</h4>

                        {
                            information.map((info, indexi) =>
                                 <span className="information--separator">{information[index][indexi]}</span>
                            )
                        }

                        <table>
                            <tbody>
                                <tr>
                                    {
                                        headers.map((item, index) => <th key={item + '-' + index}>{item}</th>)
                                    }

                                </tr>
                                {

                                    (
                                        matrix.map((row, index) => (


                                            <tr key={'row-' + index}>
                                                {
                                                    row.map((column, colIndex) => <td key={'column' + '-' + colIndex}>{column}</td>)
                                                }
                                            </tr>
                                        ))
                                    )


                                }

                            </tbody>
                        </table>
                    </div>
                )


            }
        </div>

    );
}

export default Table;