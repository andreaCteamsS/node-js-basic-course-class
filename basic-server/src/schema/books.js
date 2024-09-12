const { verifyToken } = require("../routes/v1/verify");

const bookNotFoundResponse = {
    type: 'object',
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
        message: "The book you r are looking for does not exist"
    }
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

const getBooksOpts = {
    schema: {
        querystring: queryStringJsonSchema
    },
    preHandler: [
        verifyToken()
    ]
}

const getBookOpts = {
    schema: {
        params: idParamsJsonSchema,
        response: {
            404: bookNotFoundResponse
        }
    },
    preHandler: [
        verifyToken()
    ]
}


const postBookOpts = {
    schema: {
        body: bookValidationSchemaWithRequired
    },
    preHandler: [
        verifyToken(true)
    ]
}

const putBookOpts = {
    schema: {
        params: idParamsJsonSchema,
        body: bookValidationSchema
    },
    preHandler: [
        verifyToken(true)
    ]
}

const deleteBookOpts = {
    schema: {
        params: idParamsJsonSchema,
    },
    preHandler: [
        verifyToken(true)
    ]
}

module.exports = {
    getBooksOpts, getBookOpts,
    postBookOpts, putBookOpts
    , deleteBookOpts
}


