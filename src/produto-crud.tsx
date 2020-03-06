import * as React from 'react';
import { Crud } from './crud-padrao/crud'

interface State {    
}

interface Props{
}

export class ProdutoCrud extends React.Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render()
    {
        return (
            <Crud controlador = "produto" obterNovaInstancia = {this.obterNovaInstancia} renderizarConsulta = {this.renderizarConsulta} renderizarInclusao = {this.renderizarInclusao} renderizarAlteracao = {this.renderizarAlteracao} renderizarListaCabecalho = {this.renderizarListaCabecalho} renderizarListaLinha={this.renderizarListaLinha} renderizarExclusao = {this.renderizarExclusao} />
        );
    }
    
    obterNovaInstancia()
    {
        return (new Produto());
    }

    renderizarConsulta(obj: Produto)
    {
        return(
            <div>
                <h2>Consulta de produto</h2>
                <table>
                    <tr>
                        <td>Código:</td>
                        <td>{obj.codigo}</td>
                    </tr>
                    <tr>
                        <td>Descrição:</td>
                        <td>{obj.descricao}</td>
                    </tr>
                </table>                
            </div>
        );
    }

    renderizarExclusao(obj: Produto)
    {
        return(
            <div>
                <h3>Deseja excluir o produto abaixo?</h3>
                <div>Código: {obj.codigo}</div>
                <div>Descrição: {obj.descricao}</div>
            </div>
        );
    }

    renderizarAlteracao(metodoLigacao: (e) => void, obj: Produto)
    {
        return (<div>
            <h2>Alteração de produto</h2>
            <div>Código:</div>
            <input type="text" name="codigo" value={obj.codigo} readOnly/>
            <div>Descrição:</div>
            <input type="text" name="descricao" value={obj.descricao} onChange={metodoLigacao}/>
        </div>);
    }

    renderizarInclusao(metodoLigacao: (e) => void)
    {
        return (<div>
            <h2>Incluisão de produto</h2>
            <div>Código:</div>
            <input type="text" name="codigo" onChange={metodoLigacao}/>
            <div>Descrição:</div>
            <input type="text" name="descricao" onChange={metodoLigacao}/>
        </div>);
    }

    renderizarListaCabecalho()
    {
        return (
            [
                <td><span>Descrição</span></td>,
                <td><span>Código</span></td>
            ]
        );
    }

    renderizarListaLinha(obj: Produto)
    {
        return (
            [
                <td><span>{obj.descricao}</span></td>,
                <td><span>{obj.codigo}</span></td>
            ]
        );
    }
}

class Produto{
    id: string;
    codigo: number;
    descricao: string;
}