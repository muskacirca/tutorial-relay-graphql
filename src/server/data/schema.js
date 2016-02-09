import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql'

import {
    globalIdField
} from 'graphql-relay'

var LineType = new GraphQLObjectType({
    name: 'LineType',
    fields: {
        id: globalIdField('LineType'),
        iccId: {
            type: GraphQLString,
            resolve: (obj) => obj.iccId
        },
        transatelId: {
            type: GraphQLString,
            resolve: (obj) => obj.transatelId
        },
        msisdn: {
            type: GraphQLString,
            resolve: (obj) => obj.msisdn
        }
    }
});

var GraphQLQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: {
        line: {
            type: LineType,
            // Here retrieve data
            resolve: () => { return  {
                    iccId: "894561237800000001",
                    transatelId: "8945612378",
                    msisdn: "+33685451021"
                }
            }
        }
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLQuery
});

