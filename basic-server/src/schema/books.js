// const book = {
//     type: 'object',
//     properties: {
//         id: {
//             type: 'integer'
//         },
//         title: {
//             type: 'string'
//         },
//         author: {
//             type: 'string'
//         },
//         isbn: {
//             type: 'string'
//         },
//         published_year: {
//             type: 'number'
//         }
//     }
// };
// const bookNotFoundResponse = {
//     type: 'object',
//     properties: {
//         statusCode: {
//             type: 'integer'
//         },
//         error: {
//             type: 'string'
//         },
//         message: {
//             type: 'string'
//         }
//     },
//     example: {
//         statusCode: 404,
//         error: "Not Found",
//         message: "The book you r are looking for does not exist"
//     }
// };
// const getBookOpts = {
//     response: {
//         200: book,
//         404: bookNotFoundResponse
//     }
// };
// const getBooksOpts = {
//     response: {
//         200: {
//             type: 'array',
//             items: book
//         }
//     }
// };

const bookValidationSchema = {
    type: 'object',
    required: ['title', 'author', 'isbn', 'published_year'],
    properties: {
        title: {
            type: 'string'
        },
        author: {
            type: 'string'
        },
        isbn: {
            type: 'string'
        },
        published_year: {
            type: 'number'
        },
    }
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
    }
}

const getBookOpts = {
    schema: {
        params: idParamsJsonSchema,
    }
}


const postBookOpts = {
    schema: {
        body: bookValidationSchema
    }
}

const putBookOpts = {
    schema: {
        params: idParamsJsonSchema,
        body: bookValidationSchema
    }
}

const deleteBookOpts = {
    schema: {
        params: idParamsJsonSchema,
    }
}

module.exports = {
    getBooksOpts, getBookOpts,
    postBookOpts, putBookOpts
    , deleteBookOpts
}


