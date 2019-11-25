var DataTypes = require('sequelize');
import { sequelize } from '../../data/db';
const Agente = require('./agente');
const Estado = require('./estado');

const control = sequelize.define('control', {
    BId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Lineas: {
        type: DataTypes.BIGINT,
    },
    FechaIn: {
        type: DataTypes.DATE
    },
    FechaOut: {
        type: DataTypes.DATE
    },
    Tin: {
        type: DataTypes.DATE(6)
    },
    Tout: {
        type: DataTypes.DATE(6)
    },
    AgentId: {
        type: DataTypes.BIGINT,
    },
    Sent: {
        type: DataTypes.BIGINT,
    }

    //AgentId: {}
}, {
    tableName: 'control',
    timestamps: false
});

control.belongsTo(Agente, {foreignKey: 'AgentId',targetKey: 'AgentId'}, {as: 'Agente'});
control.belongsTo(Estado, {foreignKey: 'Sent', targetKey: 'IdEstado'}), {as: 'Estado'};


module.exports = control;