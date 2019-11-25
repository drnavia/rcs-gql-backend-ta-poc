var DataTypes = require('sequelize');
import { sequelize } from '../../data/db';

const estado = sequelize.define('estado', {
    IdEstado: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Estado: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'estados',
    timestamps: false
});

module.exports = estado;