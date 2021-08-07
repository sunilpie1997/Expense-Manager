import { gql } from '@apollo/client';

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email:$email,password:$password)
}
`;

const REGISTER = gql`
mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String, $currency: CurrencyEnum!) {
    registerUser(email:$email, password:$password,firstName:$firstName, lastName:$lastName, currency:$currency)
}
`;

const LOGOUT = gql`
mutation Logout {
    logout
}
`;

const ADD_EXPENSE = gql`
mutation($category: CategoryEnum!, $description:String!, $amount:Int!, $dateTime: Date!) {
    addExpense(category:$category,description:$description,amount:$amount,dateTime:$dateTime){
      amount,
      description,
      category,
      dateTime,
      _id
    }
  }
`;


export { LOGIN, REGISTER, LOGOUT, ADD_EXPENSE };