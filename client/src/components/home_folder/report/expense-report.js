import React, {useContext} from 'react';
import { DataStoreContext } from '../../context/data-store-context';
import ReportPerWeek from './report-per-week';
import ReportPerCategory from './report-per-category';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { useStyles } from '../../../styles/material-styles';
import Typography from '@material-ui/core/Typography';

const ExpenseReport = () => {

    const { report } = useContext(DataStoreContext);
    const perWeekList = report.perWeekList;
    const perCategoryList = report.perCategoryList;
    const classes = useStyles();

    return (
        <Box className={classes.box_margin}>
            <Typography variant="h6" color="primary">Month based expense report</Typography>

            {/* per week */}
            <Box className={classes.report_table_box}>
                <TableContainer component={Paper} className={classes.report_table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Week</TableCell>
                                <TableCell>Expense</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                perWeekList.map( perWeekExpense => {
                                    return <ReportPerWeek key = {perWeekExpense._id} perWeek = {perWeekExpense}/>
                                } )

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* per category */}
            <Box className={classes.report_table_box}>
                <TableContainer component={Paper} className={classes.report_table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Expense</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                perCategoryList.map( perCategoryExpense => {
                                    return <ReportPerCategory key = {perCategoryExpense._id} perCategory = {perCategoryExpense}/>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    )
    
}

export default ExpenseReport;