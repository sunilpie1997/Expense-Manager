import { gql } from '@apollo/client';

const GET_USER = gql`

    query get_user($limit: Int!, $offset: Int!, $todayDate: Date!){
        getUser
        {
            _id,
            firstName,
            lastName,
            email,
            expenses(limit:$limit,offset:$offset)
            {
                _id,
                category,
                currency,
                description,
                amount,
                dateTime
            },
            report(todayDate:$todayDate)
            {
                total,
                perWeekList
                {
                    _id,
                    expense
                },
                perCategoryList
                {
                    _id,
                    expense
                }
            }
        }
    }
`;

export { GET_USER };