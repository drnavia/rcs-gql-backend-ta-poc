// Importar el módulo de Sequelize (ORM)
import Sequelize from 'sequelize';

// Definir las variables de entorno para la conexión a la base
const DB_NAME = 'rcs_db3';
const DB_USER = 'root';
const DB_PASS = 'root';
const DB_HOST = 'poc-rcs-mariadb';
const DB_PORT = 3306;

// Crear la conexión a la base con Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'mysql',
    operatorsAliases: false,
    host: DB_HOST,
    port: DB_PORT,
    define: {
        timestamps: false
    }
});

// Probar la conexion a la base
sequelize.authenticate()
    .then(() => {
        console.log('<<< CONECTADO A LA BASE DE DATOS >>>')
    })
    .catch(err => {
        console.log('### NO SE CONTECTO A LA BASE DE DATOS ###')
    });

// sequelize.import('../src/models/models');

// Exportar la conexión a la base
module.exports = {
    sequelize,
};