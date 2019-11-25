var DataTypes = require('sequelize');
import { sequelize } from '../../data/db';

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
    //AgentId: {}
}, {
    tableName: 'control',
    timestamps: false
});

module.exports = control;