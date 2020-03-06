import * as React from 'react';
import { ICrudModel } from './crud-model';

interface State<T extends ICrudModel> {
    lista: T[];
}

interface Props<T extends ICrudModel>{
    lista: T[];
    abrirConsulta: (obj: T) => void;
    abrirInclusao: () => void;
    abrirAlteracao: (obj: T) => void;
    abrirExclusao: (obj: T) => void;
    renderizarCabecalho: () => React.ReactNode[];
    renderizarLinha: (obj: T) => React.ReactNode[];
}

export class CrudLista<T extends ICrudModel> extends React.Component<Props<T>, State<T>> {
    constructor(props){
        super(props);
        this.state = {
            lista: props.lista
        }
    }

    render()
    {
        var itens : JSX.Element[] = [];

        this.state.lista.forEach(obj => {
            itens.push(<tr key={obj.id}>
                {this.props.renderizarLinha(obj)}
                <td>
                    <button type="button" onClick={() => this.props.abrirConsulta(obj)} className="btn btn-primary btn-sm mr-1">Consultar</button>
                    <button type="button" onClick={() => this.props.abrirAlteracao(obj)} className="btn btn-warning btn-sm mr-1">Alterar</button>
                    <button type="button" onClick={() => this.props.abrirExclusao(obj)} className="btn btn-danger btn-sm mr-1">Excluir</button>
                </td>
            </tr>);
        })

        return (
            <div>
                <button type="button" onClick={() => this.props.abrirInclusao()} className="btn btn-primary mr-1">Incluir</button>    
                
                <table className='table'>
                    <thead>
                        <tr>
                            { this.props.renderizarCabecalho() }
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {itens}
                    </tbody>
                </table>                
            </div>
        );
    }
}