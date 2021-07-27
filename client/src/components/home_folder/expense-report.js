import React, {useContext} from 'react';
import { DataStoreContext } from '../context/data-store-context';
import ReportPerWeek from './report-per-week';
import ReportPerCategory from './report-per-category';

const ExpenseReport = () => {

    const { report } = useContext(DataStoreContext);
    const perWeekList = report.perWeekList;
    const perCategoryList = report.perCategoryList;

    return (
        <React.Fragment>
            {
                perWeekList.map( perWeekExpense => {

                    return <ReportPerWeek key = {perWeekExpense._id} perWeek = {perWeekExpense}/>
                } )

            }
            <br/>
            {
                perCategoryList.map( perCategoryExpense => {
                    return <ReportPerCategory key = {perCategoryExpense._id} perCategory = {perCategoryExpense}/>
                })
            }

        </React.Fragment>
    )
    
}

export default ExpenseReport;