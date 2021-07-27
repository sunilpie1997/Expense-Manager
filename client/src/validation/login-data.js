let email_regex = /^\S{3,40}@\S{3,10}\.\S{2,3}$/;
let password_regex = /^\S{8,20}$/;
let name_regex = /^\S{3,20}$/;

export const validateLoginData = ({email,password}) => {
    if(!email || !password)
    {
        return false
    }

    return email_regex.test(email) && password_regex.test(password);
}

export const validateRegisterData = ({email, password, firstName}) => {
    if(!firstName || !email || !password)
    {
        return false
    }

    return email_regex.test(email) && ( password_regex.test(password) && name_regex.test(firstName) );
}
