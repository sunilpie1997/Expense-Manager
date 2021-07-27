// get session details from session
// throws error if user has not logged in

// used wherever, authentication / authorization is required
const getSessionDetails = (session) => {

    if(!session || !session.userId)
    {
        throw new Error("please login");
    }
    //returns 'userId' and 'isAdmin' property from session
    return { userId:session.userId, isAdmin:session.isAdmin };
}

module.exports = getSessionDetails;