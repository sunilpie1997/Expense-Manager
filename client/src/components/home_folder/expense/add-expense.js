import React, {useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../../../graphql/mutations';
import { GET_USER } from '../../../graphql/queries';
import { validateExpenseData } from '../../../validation/expense-data';
import LoadingComponent from '../../loading';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../styles/material-styles';
import { MonthYearContext } from '../home';

const  AddExpense = (props) => {

    const hideAddExpenseComponent = props.hideAddExpenseComponent;
    const [newExpense, setNewExpense] = useState({
        category:'OTHER',
        amount:1,
        description:'',
        dateTime:new Date()
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const classes = useStyles();

    const monthYear = useContext(MonthYearContext);

    const { category, dateTime, amount, description} = newExpense;

    const onErrorOccur = ({graphQLErrors, networkError}) => {
        setSuccessMessage('');
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const onSuccess = () => {
        setError('');
        setSuccessMessage("successfully added");
    }

    const [addExpense, { loading }] = useMutation(ADD_EXPENSE,{ 
        
        variables: {category:category, description:description, amount:parseInt(amount), dateTime:dateTime },
        onError:onErrorOccur,
        onCompleted: onSuccess,
        refetchQueries:[
            { query: GET_USER, variables: { limit:10, offset: 0, month:monthYear.month, year:monthYear.year }}
        ]
    });

    const handleChange = (e) => {
        setNewExpense({...newExpense, [e.target.name]:e.target.value});
    }
    const handleDateChange = (date) => {
        setNewExpense({...newExpense, dateTime:date});

    } 

    const onSubmit = () => {
        if(validateExpenseData({amount:amount, description:description}))
        {
            console.log("form submitted", newExpense);
            addExpense();
        }
    }

    if(loading) return <LoadingComponent/>

    return (
        <Box>
            { error ?  <Typography variant="body1" className={classes.error_text}>{error}</Typography> : ''}
            { successMessage ? <Typography variant="body1" className={classes.success_text}>{successMessage}</Typography> : ''}
            
            <Box className={classes.register_box}>
                <FormControl style={{minWidth:"200px"}}>
                    <InputLabel id="category-label">category</InputLabel>
                    <Select name="category"  labelId="category-label" value={category} style={{textAlign:"left"}} onChange={handleChange}>
                        <MenuItem value="SHOPPING">Shopping</MenuItem>
                        <MenuItem value="HOME">Home</MenuItem>
                        <MenuItem value="FOOD">Food</MenuItem>
                        <MenuItem value="FUEL">Fuel</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                </FormControl>
                <br/><br/>
                <TextField label="amount" name="amount" type="number" InputLabelProps={{ shrink: true }} value={amount} onChange={handleChange}/>
                <br/><br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        value={dateTime}
                        format="dd/MM/yyyy"
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        style={{maxWidth:"200px"}}
                    />
                    <br/><br/>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={dateTime}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        style={{maxWidth:"200px"}}
                    />
                </MuiPickersUtilsProvider>
                <br/><br/>
                <TextField label="description" name="description" value={description} onChange={handleChange}/>
                <br/><br/>
                
                <Fab variant="extended" color="primary" size="small" onClick={onSubmit} style={{margin:'1em'}}>Add</Fab>
                <Fab variant="extended" color="primary" size="small" onClick={hideAddExpenseComponent} style={{margin:'1em'}}>Back</Fab>
            </Box>
        </Box>
    );  
}


export default AddExpense;