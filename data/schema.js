const { ApolloServer, gql} = require('apollo-server-express');
const {Storage} = require('@google-cloud/storage');
require('dotenv').config();



const storage = new Storage({
  projectId: 'concrete-slab',
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

  // Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = `
# Comments in GraphQL are defined with the hash (#) symbol.

# This "Book" type can be used in other type declarations.
type Book {
  title: String
  author: String
}

type Page {
  title: String
  last: String
  born: String
}


# The "Query" type is the root of all GraphQL queries.
# (A "Mutation" type will be covered later on.)
type Query {
  books: [Book]
  pages: [Page]
}

`;


// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      async pages() {
          // Lists files in the bucket
          const [files] = await storage.bucket('concrete-slab-test-bucket').getFiles({prefix: 'pages/'});
          return files.map(file =>   ({ title: file.name}))
      }
    }
};

const schema =  new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql'
  }
});

module.exports = schema;