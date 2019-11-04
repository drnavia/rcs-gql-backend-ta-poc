// Importar el módulo del ORM
import Sequelize from 'sequelize';
import { sequelize } from '../../data/db';
// -------------------------------------------------------------------------------- //

const Agentes = sequelize.define('agentes', {
    AgentId: {
        type:   Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Remitente:  Sequelize.STRING,
    Logica:     Sequelize.STRING,
    TipoAgente: Sequelize.STRING,
    CantidadPreguntas: Sequelize.INTEGER,
    Address:    Sequelize.STRING
}, {
    freezeTableName: true,
});

const Control = sequelize.define('control', {
    BId: {
        type:  Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    AgentId: {
        type:  Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Agentes', // name of Target model
            key: 'AgentId', // key in Target model that we're referencing
        },
    },
    Name:      Sequelize.STRING,
    Descripcion: Sequelize.STRING,
    FechaIn:   Sequelize.DATE,
    FechaOut:  Sequelize.DATE,
    Tin:       Sequelize.TIME,
    Tout:      Sequelize.TIME,
    Sent:      Sequelize.INTEGER,
    Lineas:    Sequelize.INTEGER
}, {
    freezeTableName: true,
});

const Enviados = sequelize.define('enviados', {
    Bid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Line:     Sequelize.BIGINT,
    Tin:      Sequelize.TIME,
    Send:     Sequelize.TINYINT,
    St:       Sequelize.INTEGER
}, {
    freezeTableName: true,
});

const Estados = sequelize.define('estados', {
    IdEstado: {
        type:  Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Estado:    Sequelize.STRING
}, {
    freezeTableName: true,
});

const Respuestas = sequelize.define('respuestas', {
    Id: {
        type:  Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    Bid:       Sequelize.INTEGER.UNSIGNED,
    AgentId:   Sequelize.INTEGER.UNSIGNED,
    Linea:     Sequelize.BIGINT,
    NroRespuesta: Sequelize.TINYINT,
    Respuesta: Sequelize.CHAR,
}, {
    freezeTableName: true,
});

const SendVal = sequelize.define('sendval', {
    Send: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descrip:  Sequelize.STRING
}, {
    freezeTableName: true,
});

const Usuarios = sequelize.define('usuarios', {
    ID_Usuario: {
        type:  Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Legajo:    Sequelize.STRING,
    Usuario:   Sequelize.STRING,
    ID_Grupo: {
        type:  Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'grupos', // 'persons' refers to table name
            key: 'ID_Grupo', // 'id' refers to column name in persons table
        }
    },
    Nivel_De_Acceso: Sequelize.STRING,
    MailCompleto: {
        type:  Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
});

// -------------------------------------------------------------------------------- //
/*
const Broadcast = sequelize.query(
    `SELECT c.BId, c.Name, a.Remitente, e.Estado 
        FROM control c, agentes a, estados e 
        WHERE c.AgentId = a.AgentId 
        AND c.Sent = e.IdEstado 
        ORDER BY BId DESC 
        LIMIT 11`, {
        nest: true,
        type: sequelize.QueryTypes.SELECT,
        model: sequelize.broadcast,
        mapToModel: true // pass true here if you have any mapped fields

    })*/
/*     .then(projects => {
    console.log(projects) // Each record will now be an instance of Project
}); */

// Exportar los modelos
module.exports = {
    Agentes,
    Control,
    Enviados,
    Estados,
    SendVal,
    Respuestas,
    Usuarios,
};