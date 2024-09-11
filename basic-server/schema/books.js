const book = { type: 'object', properties: { id: { type: 'integer' }, title: { type: 'string' }, author: { type: 'string' }, isbn: { type: 'string' }, published_year: { type: 'number' } } };
const bookNotFoundResponse = { type: 'object', properties: { statusCode: { type: 'integer' }, error: { type: 'string' }, message: { type: 'string' } }, example: { statusCode: 404, error: "Not Found", message: "The book you r are looking for does not exist" } };
const getBookOpts = { response: { 200: book, 404: bookNotFoundResponse } };
const getBooksOpts = { response: { 200: { type: 'array', items: book } } };


module.exports = { getBooksOpts, getBookOpts }