import express from 'express';
import { sequelize } from '../data/db';
import { ApolloServer } from 'apollo-server-express';

// schema & resolvers
import { typeDefs } from './schemas/schemas';
import { resolvers } from './resolvers/resolvers';

//const {sequelize, Usuarios, Grupos } = require('../data/db');

// Crear la aplicacion de Express
const app = express();

// Crear el Servidor de Apollo
const server = new ApolloServer({typeDefs, resolvers});

// Crear el Middleware que conecta Apollo con Express
server.applyMiddleware({app});

app.get('/', (req, res) => {
    res.send('<h2>PoC Canal RCS > Servidor GraphQL <a href="http://localhost:8008/graphql">/graphql</a></h2><p>El <strong>Playground de GraphQL</strong> se encuentra corriendo desde <a href="http://localhost:8008/graphql"><b>http://localhost:8008/graphql</b></a></p>');
});

app.listen({port: 8008}, () => console.log(`<<< EL SERVIDOR ESTA CORRIENDO DESDE: http://localhost:8008${server.graphqlPath} >>>`));

/*
sequelize.sync()
	.then(resultado => {
		console.log(resultado);
		app.listen(8008);
	})
	.catch(error => {
		console.log(error);
	});
*/