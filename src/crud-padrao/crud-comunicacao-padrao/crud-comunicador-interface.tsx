import { ICrudModel } from "../crud-model";


export interface ICrudComunicador<T extends ICrudModel>
{
    listar(controlador : string, apresentarLista : (lista : T[]) => void, falhar : (mensagem: string) => void);
    incluir(controlador : string, obj: T, concluir : () => void, falhar : (mensagem: string) => void);
    alterar(controlador : string, obj: T, id: string, concluir : () => void, falhar : (mensagem: string) => void);
    excluir(controlador : string, id: string, concluir : () => void, falhar : (mensagem: string) => void);
}