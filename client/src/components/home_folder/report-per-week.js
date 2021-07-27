import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ReportPerWeek = (props) => {

    const {_id, expense} = props.perWeek;

    return (

        <TableRow>
            <TableCell>{`week ${_id}`}</TableCell>
            <TableCell>{expense}</TableCell>
        </TableRow>
    ) 
}

export default ReportPerWeek;