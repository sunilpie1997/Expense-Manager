// returns lower and upper date limit based on month and year (extracted from 'givenDate')

const getDateLimit = (givenDate) => {

    if(!givenDate || !givenDate instanceof Date)
    {
        throw new Error("invalid date provided");
    }
    const month = givenDate.getMonth();
    const year = givenDate.getFullYear();
    
    const lower= new Date(year,month,1);
    console.log("lower",lower);
    
    // get total days in current month           
    const getDaysInMonth = new Date(year,month+1,0).getDate();
    const higher = new Date(year,month,getDaysInMonth,23,59,59,999);
    console.log("higher",higher);

    return { lower:lower, higher:higher };

}

module.exports = getDateLimit;