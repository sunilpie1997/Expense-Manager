import React, {useContext} from 'react';
import { DataStoreContext } from '../context/data-store-context';
import ExpenseDetail from './expense-detail';
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/style';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Dashboard = () => {

    const { firstName, email, lastName, report, expenses } = useContext(DataStoreContext);
    const classes = useStyles();

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

            <Box className={classes.intro_box}>  
                <Typography variant="h6" color="primary">{`Hi ${firstName} ${lastName ? lastName: ''}`}</Typography>
                <Typography variant="h6" color="primary">{email}</Typography>
            </Box>

            <Box className={classes.intro_box}>
                <Typography variant="h6" color="primary">Total Spending : {report.total}</Typography>
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
                                getLastFiveExpense().map( (eachExpense) => {
                                    return <ExpenseDetail key = {eachExpense._id} expense = {eachExpense}/>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
                
        </React.Fragment>
    )
    
}

export default Dashboard;