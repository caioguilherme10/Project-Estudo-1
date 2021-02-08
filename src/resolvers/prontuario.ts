import { MyContext } from '../types';
import { Prontuario } from "../entities/Prontuario";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ProntuarioResolver {
    @Query(() => [Prontuario])
    prontuarios(@Ctx() {em}: MyContext): Promise<Prontuario[]>  {
        return em.find(Prontuario, {});
    }

    @Query(() => Prontuario, { nullable: true })
    prontuario(
        @Arg('numProntuario', () => Int) numProntuario: number,
        @Ctx() {em}: MyContext
    ): Promise<Prontuario | null>  {
        return em.findOne(Prontuario, { numProntuario });
    }

    @Mutation(() => Prontuario)
    async createProntuario(
        @Arg('numProntuario', () => Int) numProntuario: number,
        @Arg('aih', () => String) aih: string,
        @Arg('apresentacao', () => String) apresentacao: string,
        @Ctx() {em}: MyContext
    ): Promise<Prontuario>  {
        const prontuario = em.create(Prontuario, {
            apresentacao,
            aih,
            numProntuario,
        });
        await em.persistAndFlush(prontuario);    
        return prontuario;
    }

    @Mutation(() => Prontuario, { nullable: true })
    async updateProntuario(
        @Arg('numProntuario', () => Int) numProntuario: number,
        @Arg('aih', () => String) aih: string,
        @Arg('apresentacao', () => String) apresentacao: string,
        @Ctx() {em}: MyContext
    ): Promise<Prontuario | null>  {
        const prontuario = await em.findOne(Prontuario, { numProntuario });
        if (!prontuario) {
            return null
        }
        if ((typeof aih !== 'undefined') && (typeof apresentacao !== 'undefined')) {
            prontuario.aih = aih;
            prontuario.apresentacao = apresentacao;
            await em.persistAndFlush(prontuario);   
        }   
        return prontuario;
    }

    @Mutation(() => Boolean)
    async deleteProntuario(
        @Arg('numProntuario', () => Int) numProntuario: number,
        @Ctx() {em}: MyContext
    ): Promise<boolean>  {
        try {
            await em.nativeDelete(Prontuario, { numProntuario })
        }catch {
            return false
        }
        return true;
    }
}