const typeDefs = `
    type Book {
        authors: [String]
        description: String
        bookId: ID
    }

    type User {
        username: String
        email: String
        savedBooks: [Book]
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        getSingleUser(username: String!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        saveBook(bookId: ID!, authors: [String], description: String): User
        deleteBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;
