require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose");
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {
    GraphQLSchema, 
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLEnumType,
} = require("graphql");
const validateObjectId = require("./utils/validate-object-id");
const User = require("./models/user");
const Expense = require("./models/expense");
const DateType = require("./custom_graphql_type/date-type");
const CategoryEnumType = require("./custom_graphql_type/category-enum");
const CurrencyEnumType = require("./custom_graphql_type/currency-enum");
const getSessionDetails = require("./utils/get-session-details");
const { sanitizePerWeekExpense, sanitizePerCategoryExpense } = require("./utils/sanitize-report-data");
const calTotalExpense = require("./utils/cal-total-expense");

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'user of the app',
    fields:() => ({
        _id: {
            type: GraphQLNonNull(GraphQLString),
        },
        email: {
            type: GraphQLNonNull(GraphQLString),
        },
        firstName: {
            type: GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: GraphQLString
        },
        currency: {
            type: GraphQLNonNull(CurrencyEnumType),
        },
        isAdmin: {
            type: GraphQLNonNull(GraphQLBoolean),
        },
        expenses: {
            type: GraphQLList(ExpenseType),
            args: {
                limit:{
                    type: GraphQLNonNull(GraphQLInt)
                },
                offset: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (parent, args, req) => {
                // also set max,min values for these args. implement cursor pagination later
                try
                {
                    const { limit, offset } = args;
                    return await Expense.find({ userId:parent._id}).sort({dateTime:-1}).skip(offset).limit(limit).exec();
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        report: {
            type: ExpenseReportType,
            args: {
                month: {
                    type: GraphQLNonNull(GraphQLInt),
                },
                year: {
                    type: GraphQLNonNull(GraphQLInt),
                }
            },
            resolve: async (parent, args, request) => {
                try
                {
                    const { month, year } = args;
                    const perWeekResp = await Expense.aggregate([
                        {
                            $match: {
                                userId: parent._id,
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [{ $month:'$dateTime' },month]
                                        },
                                        {
                                            $eq: [{ $year:'$dateTime' },year]
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: { $ceil : { $divide: [ {$dayOfMonth:'$dateTime'}, 7] }},
                                expense: { $sum: '$amount' }
                            }
                        },
                    ]).exec();

                    const perCategoryResp = await Expense.aggregate([
                        {
                            $match: {
                                userId: parent._id,
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [{ $month:'$dateTime' },month]
                                        },
                                        {
                                            $eq: [{ $year:'$dateTime' },year]
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id:'$category',
                                expense: { $sum: '$amount' }
                            }
                        },
                    ]).exec();
                    
                    return {
                        total: calTotalExpense(perWeekResp),
                        perWeekList: sanitizePerWeekExpense(perWeekResp),
                        perCategoryList: sanitizePerCategoryExpense(perCategoryResp)
                    }
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
    })
});

const ExpenseType = new GraphQLObjectType({
    name: 'Expense',
    description: 'an expense created by user',
    fields:() => ({
        _id: {
            type: GraphQLNonNull(GraphQLString),
        },
        amount: { 
            type: GraphQLNonNull(GraphQLInt) 
        },
        description: { 
            type: GraphQLString 
        },
        category: { 
            type: GraphQLNonNull(CategoryEnumType) 
        },
        dateTime: { 
            type: GraphQLNonNull(DateType) 
        },
        userId: {
            type: GraphQLNonNull(GraphQLString),
        }
    })
});

const ReportPerWeek = new GraphQLObjectType({
    name:'ExpensePerWeek',
    description: 'expense report per week in current month',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLString)
        },
        expense: {
            type: GraphQLNonNull(GraphQLInt)
        }
    })
});

const ReportPerCategory = new GraphQLObjectType({
    name:'ExpensePerCategory',
    description: 'expense report per category in current month',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(CategoryEnumType)
        },
        expense: {
            type: GraphQLNonNull(GraphQLInt)
        }
    })
});

const ExpenseReportType = new GraphQLObjectType({
    name: 'ExpenseReport',
    description: 'expense report per month',
    fields:() => ({
        total: {
            type: GraphQLNonNull(GraphQLInt)
        },
        perWeekList: {
            type: GraphQLList(ReportPerWeek)
        },
        perCategoryList: {
            type: GraphQLList(ReportPerCategory)
        }
    }),
});

const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'Root query',
    fields:() => ({
        getUser : {
            description: "user details",
            type: UserType,
            resolve: async (parent,args, req) => {
                try
                {
                    const { userId } = getSessionDetails(req.session);
                    const user = await User.findById(userId).exec();
                    return user;
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        getExpenseList : {
            description: "list of expenses per user",
            type: GraphQLList(ExpenseType),
            args: {
                limit:{
                    type: GraphQLNonNull(GraphQLInt)
                },
                offset: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (parent,args, req) => {
                // also set max,min values for these args. implement cursor pagination later
                try
                {
                    const { limit, offset } = args;
                    const { userId } = getSessionDetails(req.session);

                    return await Expense.find({ userId:userId}).sort({dateTime:-1}).skip(offset).limit(limit).exec();
                }
                catch(err)
                {
                    throw err;
                }       
            }
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addExpense: {
            type: ExpenseType,
            description: 'Add an Expense',
            args: {
                amount: { type: GraphQLNonNull(GraphQLInt) },
                description: { type: GraphQLString },
                category: { type: GraphQLNonNull(CategoryEnumType) },
                dateTime: { type: GraphQLNonNull(DateType) },
            },
            resolve: async (parent, args, req) => {
                try
                {
                    const { userId } = getSessionDetails(req.session);
                    const { amount, description, category, dateTime } = args;
                    const expense = new Expense({ amount: amount, description: description, category: category, dateTime:dateTime, userId: userId });
                    return await expense.save();
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        registerUser: {
            type: GraphQLString,
            description: 'Register an user',
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLString },
                currency: { type: GraphQLNonNull(CurrencyEnumType) }
            },
            resolve: async (parent, args, req) => {
                try
                {
                    const { email, password, firstName, lastName, currency } = args;
                    const user = await User.findOne({email:email}).exec();
                    
                    if(user)
                    {
                        throw new Error("user already exists with given email");
                    }
                    const hashedPassword = await bcrypt.hash(password, 12);
                    const newUser = new User({ email: email, password:hashedPassword, firstName: firstName, lastName: lastName, currency: currency });
                    await newUser.save();
                    return "user registration successful";
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        login: {
            type: GraphQLString,
            description: 'sign in user',
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args, req) => {
                try
                {
                    const { email, password } = args;
                    const user = await User.findOne({email:email}).exec();
                    
                    if(!user)
                    {
                        throw new Error("no user exists with given email");
                    }
                    const isEqual = await bcrypt.compare(password, user.password);
                    if(!isEqual)
                    {
                        throw new Error("incorrect password");
                    }
                    
                    req.session.userId = user._id;
                    req.session.isAdmin = user.isAdmin;
                    // console.log(typeof user._id);
                    return "successfull login";
                    // return user;
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        logout: {
            type: GraphQLNonNull(GraphQLString),
            description: 'logout user',
            resolve: async (parent, args, req) => {
                try
                {
                    req.session.destroy();
                    return "logged out successfully";
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        //PUT
        editExpense: {
            type: ExpenseType,
            description: 'Update an Expense',
            args: {
                expenseId: { type:GraphQLNonNull(GraphQLString) },
                amount: { type: GraphQLNonNull(GraphQLInt) },
                description: { type: GraphQLString },
                category: { type: GraphQLNonNull(CategoryEnumType) },
                dateTime: { type: GraphQLNonNull(DateType) },
            },
            resolve: async (parent, args, req) => {
                try
                {
                    const { userId } = getSessionDetails(req.session);
                    const { expenseId, amount, description, category, dateTime } = args;

                    if(!validateObjectId(expenseId) )
                    {
                        throw new Error("enter valid expense id");
                    }

                    const expense = await Expense.findById(expenseId).exec();
                    if(!expense)
                    {
                        throw new Error("no such expense exist with given id");
                    }
                    if(expense.userId != userId)
                    {
                        throw new Error("you are not authorised");
                    }
                    expense.amount = amount;
                    expense.description = description;
                    expense.category = category;
                    expense.dateTime = dateTime;

                    return await expense.save();
                }
                catch(err)
                {
                    throw err;
                }
            }
        },
        deleteExpense: {
            type: GraphQLString,
            description: 'delete an Expense',
            args: {
                expenseId: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args, req) => {
                try
                {
                    const { userId } = getSessionDetails(req.session);
                    const { expenseId } = args;

                    if(!validateObjectId(expenseId) )
                    {
                        throw new Error("enter valid expense id");
                    }
                    const expense = await Expense.findById(expenseId).exec();
                    if(!expense)
                    {
                        throw new Error("no such expense exist with given id");
                    }
                    if(expense.userId != userId)
                    {
                        throw new Error("you are not authorised");
                    }
                    await expense.remove();
                    return "successfully deleted";

                }
                catch(err)
                {
                    throw err;
                }
            }
        },         
    })
  })

const schema = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType
});

const app = express();

app.use(bodyParser.json());

app.use(cors({
    
    origin: [process.env.FRONTEND_URL, "192.168.43.174:3000"],
    // are these necessary ??
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
    credentials: true
}));

const sessionMiddleware = session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: true,
    // to prevent empty session objects from being saved to session store
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 60 * 24 // session max age in miliseconds (1 day)
    }
  })

app.use(sessionMiddleware);

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
mongoose.connection.on('connected', ()=>{  
    console.log("connected to MongoDB cloud ");
});
    
/* if error while connecting */
mongoose.connection.on('error', (err)=>{
    console.log("Mongoose connection error has occured ",err);
});
    
/* if disconnected */
mongoose.connection.on('disconnected', ()=>{
    console.log("MongoDB cloud is disconnected");
});

app.listen(5000,() => console.log('server running on port 5000'));