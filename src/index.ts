import "reflect-metadata";
import { ProntuarioResolver } from './resolvers/prontuario';
//import { Prontuario } from './entities/Prontuario';
import { MikroORM } from "@mikro-orm/core";
import microConfig from './mikro-orm.config';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from './resolvers/hello';

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ProntuarioResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
    /*const prontuario = orm.em.create(Prontuario, {
        apresentacao: '',
        aih: '',
        numProntuario: 1,
    });
    await orm.em.persistAndFlush(prontuario);*/

    /*const prontuarios = await orm.em.find(Prontuario, {});
    console.log(prontuarios);*/
};

main().catch((err) => {
    console.error(err);
});
