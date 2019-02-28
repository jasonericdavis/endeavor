const { ApolloServer, gql} = require('apollo-server-express');
const {Storage} = require('@google-cloud/storage');
const {Firestore} = require('@google-cloud/firestore')
const fs = require('fs');
require('dotenv').config();



const db = new Firestore({
  projectId: 'concrete-slab',
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

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
  id: String
  title: String
}

type Site {
  id: String
  url: String
  user: String
  pages: [Page]
}


# The "Query" type is the root of all GraphQL queries.
# (A "Mutation" type will be covered later on.)
type Query {
  books: [Book]
  pageById(id: String): [Page]
  sites: [Site]
}

`;


// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      async pageById(_, {id}, { dataSources }) {
        const pages = []
        const siteRef = await dataSources.fsAPI.collection('sites').doc('test.com').collection('Pages').where('id','==',id);

        await siteRef.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            pages.push({id: doc.id, ...doc.data()})
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
        return pages;
      },
      async sites(_, __, { dataSources }) {
        const sites = []
        const query =  await dataSources.fsAPI.collection('sites').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            sites.push({id: doc.id, ...doc.data()})
          });
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
        return sites;
      }
    },
    Site: {
      async pages(parent, __, { dataSources }) {
        const pages = []
        const siteRef = await dataSources.fsAPI.collection('sites').doc(parent.id).collection('Pages');

        await siteRef.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            pages.push({id: doc.id, ...doc.data()})
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
        return pages;
      }
    }
};

const schema =  new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  dataSources: () => ({
    fsAPI: db
  }),
  playground: {
    endpoint: '/graphql'
  }
});

module.exports = schema;