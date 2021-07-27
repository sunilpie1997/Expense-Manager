const { GraphQLScalarType, Kind } = require('graphql');

const DateType = new GraphQLScalarType({
  
    name: 'Date',
    description: 'Custom date type',
    
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

module.exports = DateType;