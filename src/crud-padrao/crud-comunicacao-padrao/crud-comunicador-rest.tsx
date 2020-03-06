
import { ICrudComunicador } from './crud-comunicador-interface';
import { ICrudModel } from '../crud-model';

const url = 'http://localhost:50795/api/';

export class CrudComunicadorRest<T extends ICrudModel> implements ICrudComunicador<T>
{
    listar(controlador : string, apresentarLista : (lista : T[]) => void, falhar : (mensagem: string) => void)
    {
        fetch(url + controlador)
        .then(response => response.json() as Promise<T[]>)
        .then(data => {
            apresentarLista(data);
        });
    }

    incluir(controlador : string, obj: T, concluir : () => void, falhar : (mensagem: string) => void)
    {
        console.log(JSON.stringify(obj));

        fetch(url + controlador,{
            method: 'post',
            body: JSON.stringify(obj),
            headers: {'Content-type': 'application/json'}
        })
        .then(response => response.json() as Promise<T>)
        .then(data => {
            concluir();
        });
    }

    alterar(controlador : string, obj: T, id: string, concluir : () => void, falhar : (mensagem: string) => void)
    {
        fetch(url + controlador + "/" + id,{
            method: 'put',
            body: JSON.stringify(obj),
            headers: {'Content-type': 'application/json'}
        })
        .then(res => res.text())
        .then(res => {
            if (res == null || res == undefined || res == '')
                concluir();
            else
                falhar(res);
        });
    }

    excluir(controlador : string, id: string, concluir : () => void, falhar : (mensagem: string) => void)
    {
        fetch(url + controlador + "/" + id,{
            method: 'delete',
            headers: {'Content-type': 'application/json'}
        })
        .then(res => res.text())
        .then(res => {
            if (res == null || res == undefined || res == '')
                concluir();
            else
                falhar(res);
        });       
    }
}