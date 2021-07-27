import { gql } from '@apollo/client';

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email:$email,password:$password)
}
`;

const REGISTER = gql`
mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String) {
    registerUser(email:$email, password:$password,firstName:$firstName, lastName:$lastName)
}
`;


export { LOGIN, REGISTER };