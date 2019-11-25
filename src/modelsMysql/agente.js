var DataTypes = require('sequelize');
import { sequelize } from '../../data/db';

const agente = sequelize.define('agente', {
    AgentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Remitente: {
        type: DataTypes.STRING(20),
    },
    Logica: {
        type: DataTypes.STRING(20),
    },
    TipoAgente: {
        type: DataTypes.STRING(20),
    },
}, {
    tableName: 'agentes',
    timestamps: false
});

module.exports = agente;