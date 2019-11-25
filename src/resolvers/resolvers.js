// Importar el módulo del ORM
import Sequelize from 'sequelize';
import { sequelize } from '../../data/db';
const EstadoSeq = require('../modelsMysql/estado');
const ControlSeq =  require ('../modelsMysql/control');
const AgenteSeq = require('../modelsMysql/agente');
// Importar los modelos
import {
    Agentes,
    Control,
    Enviados,
    Estados,
    SendVal,
    Respuestas,
    Usuarios,
    Broadcast } from '../models/models';

// Definir los Resolvers
export const resolvers = {
    Query: {
        getAgentesAll : (root, args) => {
            return Agentes.findAll();
        },/*
        async getBroadcastAll (root, args){
            return Control.findAll()
        },*/
        /*getBroadcast() {
            return sequelize.query(
                `SELECT c.BId, c.Name, c.Lineas, c.FechaIn, c.Tin, c.FechaOut, c.Tout, 
                        a.Remitente, a.Logica, a.TipoAgente , e.Estado 
                    FROM control c, agentes a, estados e 
                  WHERE c.AgentId = a.AgentId 
                    AND c.Sent = e.IdEstado 
                  ORDER BY BId DESC 
                  LIMIT 11`, {
                nest: true,
                type: sequelize.QueryTypes.SELECT,
            });
        },*/
        async getBroadcast() {
            let control = await ControlSeq.findAll({
                include: [{
                    model: EstadoSeq
                }, {
                    model: AgenteSeq,
                }]
            });
            return control;
        },
        async getBroadcastBy (root, { id }) {
            return Control.findByky(id)
        },
        async getTotalBroadcast (root, args) {
            return Control.count()
        },
        getEnviadosAll : (root, args) => {
            return Enviados.findAll();
        },
        async getTotalEnviados (root, args) {
            return Enviados.count()
        },
        getUsuariosAll : (root, args) => {
            return Usuarios.findAll();
        },
        getCantRespuetas() {
            return sequelize.query(
            `SELECT q.BId, q.AgentId, q.CantPtas, q.CantLineas, q.RtasHasta, q.CantRtas
                FROM (SELECT r.BId, r.AgentId, a.CantidadPreguntas as CantPtas,
                            (SELECT count(e.Send)
                                FROM enviados e
                                WHERE e.Send IN (3, 4, 5, 6)
                                AND e.Bid = r.BId
                                GROUP BY e.Bid)as CantLineas,
                            concat('Responde h/', r.RtasHasta) as RtasHasta,
                            count(r.RtasHasta) as CantRtas
                        FROM (SELECT y.BId, y.AgentId, max(NroRespuesta) as RtasHasta
                                FROM respuestas y
                                GROUP BY y.BId, y.Linea
                                ORDER BY y.BId, max(NroRespuesta)) r, agentes a, control c
                        WHERE r.AgentId = a.AgentId
                        AND r.BId = c.BId
                        GROUP BY r.BId, r.RtasHasta
                        UNION
                        SELECT r2.BId, r2.AgentId, a2.CantidadPreguntas as CantPtas,
                                (SELECT count(e.Send)
                                FROM enviados e
                                WHERE e.Send IN (3, 4, 5, 6)
                                    AND e.Bid = r2.BId
                                GROUP BY e.Bid) as CantLineas,
                                (CASE r2.NroRespuesta
                                WHEN null THEN 'Sin responder'
                                ELSE 'Sin responder'
                                END) as RtasHasta,
                                (SELECT count(e.Send)
                                FROM enviados e
                                WHERE e.Send IN (3, 4, 5, 6)
                                    AND e.Bid = r2.BId
                                GROUP BY e.Bid) -
                                (SELECT count(DISTINCT r3.Linea)
                                FROM respuestas r3
                                WHERE r3.BId = r2.BId
                                GROUP BY r3.Bid) as CantRtas
                        FROM respuestas r2, agentes a2
                        WHERE r2.AgentId = a2.AgentId
                        GROUP BY r2.BId) as q
                WHERE q.BId >= 1;`, {
                nest: true,
                type: sequelize.QueryTypes.SELECT,
            });
        },
        getCantRtasComps() {
            return sequelize.query(
            `SELECT e.Bid,
                    (SELECT count(e2.Send)
                    FROM enviados e2
                    WHERE e2.Send IN (3, 4, 5, 6)
                        AND e2.Bid = e.BId
                    GROUP BY e2.Bid)as CantLineas,
                    e.Send, s.descrip, count(e.Bid) as CantRtasComp
               FROM enviados e, sendval s
              WHERE e.Send = s.Send
                AND e.Send IN (3, 4, 5, 6)
                AND e.Bid >=1
              GROUP BY e.Bid, e.Send
              ORDER BY e.Bid DESC
              LIMIT 11`, {
                nest: true,
                type: sequelize.QueryTypes.SELECT,
            });
        },
        getCantBroadcast() {
            return sequelize.query(
            `SELECT c.Sent, e.Estado, count(e.Estado) as CantBroadcast
               FROM control c, estados e
              WHERE c.Sent = e.IdEstado
                AND c.Sent IN (0, 1, 2, 4)
              GROUP BY c.Sent;`, {
                nest: true,
                type: sequelize.QueryTypes.SELECT,
            });
        }
    }
};

