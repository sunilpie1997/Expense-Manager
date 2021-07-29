import React, {useContext} from 'react';
import { DataStoreContext } from '../../context/data-store-context';
import ExpenseDetail from './expense-detail';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/material-styles';
import Typography from '@material-ui/core/Typography';

const ExpenseList = () => {
    
    const { expenses } = useContext(DataStoreContext); 
    const classes = useStyles();
    
    return (
        <Box className={classes.box_margin}>
            <Typography variant="h6" color="primary">List of your expenses</Typography>

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
           
        </Box>
    )
    
}

export default ExpenseList;