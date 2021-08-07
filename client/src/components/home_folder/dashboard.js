import React, {useContext} from 'react';
import ExpenseDetail from './expense/expense-detail';
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/material-styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {GET_USER} from '../../graphql/queries';
import { apolloClient } from '../../graphql/apollo-client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MonthYearContext } from './home';
import { getMonthName } from '../../utils/get-month-name';

const Dashboard = () => {

    const classes = useStyles();
    const monthYear = useContext(MonthYearContext);

    const data = apolloClient.readQuery({
        query: GET_USER,
        variables: { limit:10, offset: 0, month:monthYear.month, year:monthYear.year },
    })
    
    let user, report, expenses;
    if(data)
    {
        user = data.getUser;
        report = user.report;
        expenses = user.expenses;
    }

    return (
        data ? (    
            <React.Fragment>

                <Box className={classes.intro_box}>  
                    <Typography variant="h6" color="primary">
                        Welcome &nbsp;{`${user.firstName} ${user.lastName ? user.lastName: ''}`}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">{user.email}</Typography>
                </Box>

                <Box className={classes.intro_box}>
                    <Typography variant="h6" color="primary">Total Spending : {user.currency}&nbsp;&nbsp; {report.total}/ {getMonthName(monthYear.month)}</Typography>
                </Box> 
                    
                <Box>
                    <Typography variant="h6" color="primary">Last 5 transactions</Typography>

                    { !expenses.length && <Typography variant="h6" color="secondary">You have no transactions</Typography> }
                    <TableContainer component={Paper} className={classes.table_margin}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
         
                                    expenses.slice(0,5).map( (eachExpense) => {
                                        return <ExpenseDetail key = {eachExpense._id} expense = {eachExpense}/>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </React.Fragment>
        ):
        (
            <Typography variant="body1" className={classes.error_text}>
                Apollo cache found empty. Contact Admin ...
            </Typography>
        )
    );
    
}

export default Dashboard;