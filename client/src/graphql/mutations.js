import { gql } from '@apollo/client';

// const LOGIN = gql`
// mutation Login($email: String!, $password: String!, $todayDate: Date! ) {
//     login(email:$email,password:$password)
//     {
//         _id,
//         email,
//         firstName,
//         lastName,
//         expenses(limit:10,offset:0)
//         {
//             _id,
//             amount,
//             category,
//             description,
//             currency,
//             dateTime
//         }
//         report(todayDate:$todayDate)
//         {
//             total,
//             week
//             {
//                 _id,
//                 expense
//             }
//             category
//             {
//                 _id,
//                 expense
//             }
//         }
//     }
// }
// `;

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email:$email,password:$password)
}
`;


export { LOGIN };