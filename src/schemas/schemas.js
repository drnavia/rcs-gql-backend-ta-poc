import { importSchema } from 'graphql-import';

const typeDefs = importSchema('src/schemas/schemas.graphql');

export { typeDefs };