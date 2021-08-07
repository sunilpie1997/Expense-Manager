// this validates if 'objectId' provided is of MongoDB 'ObjectId' type

let regex = /^[0-9a-fA-F]{24}$/;

const validateObjectId = (objectId) => {

    return regex.test(objectId);
}

module.exports = validateObjectId;