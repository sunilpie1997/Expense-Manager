import React, {useContext} from 'react';
import { DataStoreContext } from '../context/data-store-context';
import ExpenseDetail from './expense-detail';

const ExpenseList = () => {
    
    const { expenses } = useContext(DataStoreContext); 

    return (
        <React.Fragment>
            {
                expenses.map( (eachExpense ) => {
                    return <ExpenseDetail key = {eachExpense._id} expense = {eachExpense} />
                })
            }
        </React.Fragment>
    )
    
}

export default ExpenseList;