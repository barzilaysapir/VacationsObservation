let ErrorType = {

    GENERAL_ERROR: {
        id: 1, httpCode: 600,
        message: "A general error",
        isShowStackTrace: true
    },

    USER_NAME_ALREADY_EXIST: {
        id: 2, httpCode: 601,
        message: "Username already exist",
        isShowStackTrace: false
    },

    UNAUTHORIZED: {
        id: 3, httpCode: 401,
        message: "Login failed, invalid username or password",
        isShowStackTrace: false
    },

    REQUIRED_FIELDS_MISSING: {
        id: 4, httpCode: 602,
        message: "Required fields are missing",
        isShowStackTrace: false
    },

    USERNAME_FIELD_MISSING: {
        id: 5, httpCode: 603,
        message: "Username is required",
        isShowStackTrace: false
    },

    PASSWORD_FIELD_MISSING: {
        id: 6, httpCode: 604,
        message: "Password is required",
        isShowStackTrace: false
    },

    INCORRECT_PASSWORD: {
        id: 7, httpCode: 605,
        message: "Incorrect password",
        isShowStackTrace: false
    },

    PASSWORD_FIELD_MISSING: {
        id: 5, httpCode: 603,
        message: "Current password is required",
        isShowStackTrace: false
    },
};

module.exports = ErrorType;
