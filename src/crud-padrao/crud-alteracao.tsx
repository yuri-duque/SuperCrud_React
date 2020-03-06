import * as React from 'react';
import { ICrudModel } from './crud-model'

interface State<T extends ICrudModel> {
    objeto: T;
}

interface Props<T extends ICrudModel>{
    objeto: T;
    voltar: () => void;
    alterar: (obj: T, id : string) => void;
    renderizar: ( metodoLigacao: (e) => void, obj: T ) => React.ReactNode;
}

export class CrudAlteracao<T extends ICrudModel> extends React.Component<Props<T>, State<T>> {
    constructor(props){
        super(props);
        this.state = {
            objeto: this.props.objeto
        }

        this.ligarComAtributoObjeto = this.ligarComAtributoObjeto.bind(this);        
    }

    render()
    {
        return (
            <form>
                <button type="button" onClick={() => {this.props.alterar(this.state.objeto, this.state.objeto.id)}} className="btn btn-success mr-1">Gravar</button>
                <button type="button" onClick={() => this.props.voltar()} className="btn btn-secondary mr-1">Voltar</button>
                {this.props.renderizar(this.ligarComAtributoObjeto, this.state.objeto)}
            </form>
        );
    }

    ligarComAtributoObjeto(e)
    {
        const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        var obj = this.state.objeto;
        obj[e.target.name] = valor;
        this.setState({objeto: obj});
    }
}