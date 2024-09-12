const validUser = {
    type: 'object',
    required: ['UserName', 'CRCPassword', 'isAdmin'],
    properties: {
        UserName: {
            type: 'string'
        },
        CRCPassword: {
            type: 'string'
        },
        isAdmin: {
            type: 'boolean'
        }
    }
    // ,
    // example: {
    //     statusCode: 404,
    //     error: "Invalid user"
    // }
};

const bookValidationSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        author: {
            type: 'string'
        },
        isbn: {
            type: 'string',
            pattern: "^\\d{13}$"
        },
        published_year: {
            type: 'number'
        },
    }
}
const bookValidationSchemaWithRequired = {
    ...bookValidationSchema,
    required: ['title', 'author', 'isbn', 'published_year']
}
const idParamsJsonSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' }
    }
}

const queryStringJsonSchema = {
    type: 'object',
    properties: {
        authordName: {
            type: 'array',
            default: []
        },
        publicationYear: {
            type: 'array',
            default: [],
            items: {
                type: 'integer'
            }
        },
        orderBy: {
            type: 'string',
            enum: ['ASC', 'DESC']
        },
        page: {
            type: 'integer'
        },
        rowPage: {
            type: 'integer'
        }
    }
}



const signOpts = {
    schema: {
        body: validUser,
    },
    response: {
        // 404: bookNotFoundResponse
    }
}


const loginOpts = {
    schema: {
    }
}

const verifyOpts = {
    schema: {
    }
}

module.exports = {
    signOpts,
    loginOpts,
    verifyOpts
}


