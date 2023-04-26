const handleErrors = (err) => {
    const errors = { email: '', password: '' };
    // console.log(err)

    // Checks if email already exists in the database as email should be unique
    if (err.code === 11000) {
        errors.email = "Email already exists"
    }

    if (err._message === 'User validation failed') {
        if (err.errors.email) {
            errors.email = err.errors.email.properties.message;
        }
        if (err.errors.password) {
            errors.password = err.errors.password.properties.message
        }
    }
    return errors;
}

module.exports = handleErrors