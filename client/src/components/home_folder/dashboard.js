import React, {useContext} from 'react';
import { DataStoreContext } from '../context/data-store-context';
import ExpenseDetail from './expense-detail';

const Dashboard = () => {

    const { report, expenses } = useContext(DataStoreContext);

    // expenses in result are sorted by date in descending order.
    // we will take first five if exist
    const getLastFiveExpense = () => {
        if(expenses.length <= 5 )
        {
            return expenses;
        }
        else
        {
            return expenses.slice(0,5);
        }
    }
    return (
        <React.Fragment>
            <h1>Total Spending : {report.total} </h1>

            {
                getLastFiveExpense().map( (eachExpense) => {
                    return <ExpenseDetail key = {eachExpense._id} expense = {eachExpense}/>
                })
            }
        </React.Fragment>
    )
    
}

export default Dashboard;