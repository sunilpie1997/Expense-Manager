import React, {useContext, useState} from 'react';
import ExpenseDetail from './expense-detail';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import { GET_USER } from '../../../graphql/queries';
import { apolloClient } from '../../../graphql/apollo-client';
import { useStyles } from '../../../styles/material-styles';
import Typography from '@material-ui/core/Typography';
import AddExpense from './add-expense';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { MonthYearContext } from '../home';

const ExpenseList = () => {
    
    const classes = useStyles();
    const [ showAddExpense, setShowAddExpense] = useState(false);
    
    const monthYear = useContext(MonthYearContext);

    const data = apolloClient.readQuery({
        query: GET_USER,
        variables: { limit:10, offset: 0, month:monthYear.month, year:monthYear.year },
    });

    let user, expenses;
    if(data) 
    { 
        user = data.getUser;
        expenses = user.expenses;
    }

    const showAddExpenseComponent = () => {
        setShowAddExpense(true);
    }

    const hideAddExpenseComponent = () => {
        setShowAddExpense(false);
    }

    return (

        data ? (

            <Box className={classes.box_margin}>

            {
                showAddExpense ? <AddExpense hideAddExpenseComponent = {hideAddExpenseComponent}/> :
                (
                    <React.Fragment>
                        <Box style={{display:"inline-block"}}>
                            <Typography variant="h6" color="primary" style={{float:"left"}}>List of your expenses</Typography>
                            <Fab color="primary" aria-label="add" size="small" style={{marginLeft:"2em"}} onClick={showAddExpenseComponent}>
                                <AddIcon />
                            </Fab>
                        </Box>

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
                                        expenses.map( (eachExpense ) => {
                                            return <ExpenseDetail key = {eachExpense._id} expense = {eachExpense} />
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </React.Fragment>
                )
            }

            </Box>
        ):
        (
            <Typography variant="body1" className={classes.error_text}>
                Apollo cache found empty. Contact Admin ...
            </Typography>
        )
    )
    
}

export default ExpenseList;