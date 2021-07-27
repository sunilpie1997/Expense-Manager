import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ExpenseDetail = (props) => {

    const {category, amount, description, dateTime, currency} = props.expense;

    const getDateInFormat = (dateNumber) => {

        const date = new Date(dateNumber);
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    return (
        <TableRow>
            <TableCell>{category}</TableCell>
            <TableCell>{`${currency} ${amount}`}</TableCell>
            <TableCell>{getDateInFormat(dateTime)}</TableCell>
            <TableCell>{description ? description : 'not added'}</TableCell>
      </TableRow>
    ) 
}

export default ExpenseDetail;