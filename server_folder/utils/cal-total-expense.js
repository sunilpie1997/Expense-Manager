// calculates total expense per month based on expenses per week (in a month).
/* sample (for January)
    [ 
        { _id: 1, expense: 3400 },
        { _id: 2, expense: 1000 },
        { _id: 3, expense: 100 },
        { _id: 4, expense: 2000 },
        { _id: 5, expense: 3000 }
    ]
*/
const calTotalExpense = (perWeekExpenseArray) => {

    if(!Array.isArray(perWeekExpenseArray))
    {
        throw new Error("array not provided ");
    }
    
    let sum=0;
    perWeekExpenseArray.map( perWeekExpense => {

        sum = sum + perWeekExpense.expense;
    });
    
    return sum;
}

module.exports = calTotalExpense;