import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ReportPerCategory = (props) => {

    const {_id, expense} = props.perCategory;

    return (
        <TableRow>
            <TableCell>{_id.toLowerCase()}</TableCell>
            <TableCell>{expense}</TableCell>
        </TableRow>
    ) 
}

export default ReportPerCategory;