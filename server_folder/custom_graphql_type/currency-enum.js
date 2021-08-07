const { GraphQLEnumType } = require('graphql');


const CurrencyEnumType = new GraphQLEnumType({
    
    name: 'CurrencyEnum',
    description: 'allowed values for currency field',
    values: {
        INR: {
            value: "INR",
        },
        USD: {
            value: "USD",
        },
    },
});

module.exports = CurrencyEnumType;