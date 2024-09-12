const validUser = {
    type: 'object',
    required: ['UserName', 'password', 'isAdmin'],
    properties: {
        UserName: {
            type: 'string', minLength: 3, maxLength: 50
        },
        password: {
            type: 'string', minLength: 6, maxLength: 24
        },
        isAdmin: {
            type: 'boolean'
        }
    }
}

const genericErrorResponse = {
    type: 'object',
    required: ['statusCode', 'error'],
    properties: {
        statusCode: {
            type: 'integer'
        },
        error: {
            type: 'string'
        }
    },
    example: {
        statusCode: 500,
        error: "Unknown Error"
    }
};

const unauthorizedErrorResponse = {
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    properties: {
        statusCode: {
            type: 'integer'
        },
        error: {
            type: 'string'
        },
        message: {
            type: 'string'
        }
    },
    example: {
        statusCode: 401,
        error: "Unauthorized",
        message: 'Token Expired'
    }
};

const notFoundErrorResponse = {
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    properties: {
        statusCode: {
            type: 'integer'
        },
        error: {
            type: 'string'
        },
        message: {
            type: 'string'
        }
    },
    example: {
        statusCode: 404,
        error: "Not Found",
        message: 'User doesnt exist'
    }
};

const createdResponse = {
    type: 'object',
    required: ['statusCode', 'payload'],
    properties: {
        statusCode: {
            type: 'integer'
        },
        payload: {
            type: 'string'
        }
    },
    example: {
        statusCode: 201,
        payload: 'User created'
    }
};

const successResponse = {
    type: 'object',
    required: ['statusCode', 'payload'],
    properties: {
        statusCode: {
            type: 'integer'
        },
        payload: {
            type: 'object',
            properties: {
                userToken: {type: 'string'}
            }
        }
    },
    example: {
        statusCode: 200,
        payload: { userToken: 'hasfljkashflkasbfaldi' }
    }
};

const successResponseIsAdmin = {
    type: 'object',
    required: ['statusCode', 'payload'],
    properties: {
        statusCode: {
            type: 'integer'
        },
        payload: {
            type: 'object',
            properties: {
                isAdmin: {type: 'boolean'}
            }
        }
    },
    example: {
        statusCode: 200,
        payload: { isAdmin: true }
    }
};



const signOpts = {
    schema: {
        body: validUser,
        response: {
            500: genericErrorResponse,
            201: createdResponse
        }
    }
}


const loginOpts = {
    schema: {
        response: {
            500: genericErrorResponse,
            404: notFoundErrorResponse,
            401: unauthorizedErrorResponse,
            200: successResponse
        }
    }
}

const verifyOpts = {
    schema: {
        response: {
            500: genericErrorResponse,
            401: unauthorizedErrorResponse,
            200: successResponseIsAdmin
        }
    }
}

module.exports = {
    signOpts,
    loginOpts,
    verifyOpts
}


