export const validateExpenseData = ({amount, description}) => {
    if(!amount || (amount<=0 || amount>10000000))
    {
        return false;
    }
    if(description && description.length > 100)
    {
        return false;
    }
    return true;
}