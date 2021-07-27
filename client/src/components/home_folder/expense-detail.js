import React from 'react';

const ExpenseDetail = (props) => {

    const {category, amount, description, dateTime, currency} = props.expense;

    const getDateInFormat = (dateNumber) => {

        const date = new Date(dateNumber);
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    return (
        <ul>
            <li>{category}</li>
            <li>{`${currency} ${amount}`}</li>
            <li>{getDateInFormat(dateTime)}</li>
            <li>{amount}</li>
            
            { description && <li>{description}</li> }

        </ul>
    ) 
}

export default ExpenseDetail;