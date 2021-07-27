import React from 'react';

const ReportPerWeek = (props) => {

    const {_id, expense} = props.perWeek;

    return (
        <ul>
            <li>{`week ${_id}: ${expense}`}</li>
        
        </ul>
    ) 
}

export default ReportPerWeek;