import React from 'react';

const ReportPerCategory = (props) => {

    const {_id, expense} = props.perCategory;

    return (
        <ul>
            <li>{`${_id}: ${expense}`}</li>        
        </ul>
    ) 
}

export default ReportPerCategory;