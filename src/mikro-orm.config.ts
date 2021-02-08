import { MikroORM } from '@mikro-orm/core';
import { Prontuario } from './entities/Prontuario';
import { __prod__ } from "./constants";
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Prontuario],
    dbName: 'projecttwoDB',
    user: 'postgres',
    password: '0123',
    type: 'postgresql',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];