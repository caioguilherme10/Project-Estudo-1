import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Prontuario {
    @Field(() => Int)
    @PrimaryKey()
    numProntuario!: number;

    @Field()
    @Property()
    apresentacao!: string;

    @Field()
    @Property()
    aih: string;

    @Field(() => String)
    @Property({ type: 'date'})
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();
}