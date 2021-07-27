// sanitise per week expense data
/* sample

    [ 
        { _id: 1, expense: 3400 },
        { _id: 2, expense: 1000 },
    ]

    is converted to
    [ 
        { _id: 1, expense: 3400 },
        { _id: 2, expense: 1000 },
        { _id: 3, expense: 0 },
        { _id: 4, expense: 0 },
        { _id: 5, expense: 0 }
    ]
*/

const sanitizePerWeekExpense = (perWeekExpenseArray) => {

    if(!Array.isArray(perWeekExpenseArray))
    {
        throw new Error("array not provided ");
    }

    let weekStatus = {1:false, 2:false, 3:false, 4:false, 5:false};
    perWeekExpenseArray.map( perWeekExpense => {
        weekStatus[perWeekExpense._id] = true
    });

    for(each in weekStatus)
    {
        if(!weekStatus[each])
        {
            perWeekExpenseArray.push({ _id:each, expense:0 })
        }
    }
    return perWeekExpenseArray.sort( (a,b) => a._id-b._id );
}

const sanitizePerCategoryExpense = (perCategoryExpenseArray) => {

    if(!Array.isArray(perCategoryExpenseArray))
    {
        throw new Error("array not provided ");
    }
 
    let categoryStatus = {"home":false, "food":false, "fuel":false, "shopping":false, "other":false};
    perCategoryExpenseArray.map( perCategoryExpense => {
        categoryStatus[perCategoryExpense._id] = true
    });

    for(each in categoryStatus)
    {
        if(!categoryStatus[each])
        {
            perCategoryExpenseArray.push({ _id:each, expense:0 })
        }
    }
    return perCategoryExpenseArray;
}

module.exports = { sanitizePerWeekExpense, sanitizePerCategoryExpense }