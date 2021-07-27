const { GraphQLEnumType } = require('graphql');


const CategoryEnumType = new GraphQLEnumType({
    
    name: 'CategoryEnum',
    description: 'allowed values for category field',
    values: {
        FOOD: {
            value: "food",
        },
        FUEL: {
            value: "fuel",
        },
        SHOPPING: {
            value: "shopping",
        },
        HOME: {
            value: "home",
        },
        OTHER: {
            value: "other",
        },
    },
});

module.exports = CategoryEnumType;