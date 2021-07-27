let email_regex = /^\S{3,40}@\S{3,10}\.\S{2,3}$/;
let password_regex = /^\S{8,20}$/;

export const validateEmail = (email) => {
    if(!email)
    {
        return false
    }

    return email_regex.test(email);
}

export const validatePassword = (password) => {
    if(!password)
    {
        return false
    }

    return password_regex.test(password);
}
