import { gql } from '@apollo/client';

const GET_USER = gql`

    query get_user($limit: Int!, $offset: Int!, $month: Int!, $year: Int!){
        getUser
        {
            _id,
            firstName,
            lastName,
            email,
            currency
            expenses(limit:$limit,offset:$offset)
            {
                _id,
                category,
                description,
                amount,
                dateTime
            },
            report(month:$month,year:$year)
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