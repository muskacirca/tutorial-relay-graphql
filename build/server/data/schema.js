'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var LineType = new _graphql.GraphQLObjectType({
    name: 'LineType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('LineType'),
        iccId: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.iccId;
            }
        },
        transatelId: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.transatelId;
            }
        },
        msisdn: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.msisdn;
            }
        }
    }
});

var GraphQLQuery = new _graphql.GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: {
        line: {
            type: LineType,
            // Here retrieve data
            resolve: function resolve() {
                return {
                    iccId: "894561237800000001",
                    transatelId: "8945612378",
                    msisdn: "+33685451021"
                };
            }
        }
    }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: GraphQLQuery
});