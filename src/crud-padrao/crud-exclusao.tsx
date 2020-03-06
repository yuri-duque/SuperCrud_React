import * as React from 'react';
import { ICrudModel } from './crud-model';

interface State<T extends ICrudModel>{
    objeto: T;
}

interface Props<T extends ICrudModel>{
    objeto: T;
    voltar: () => void;
    excluir: (id: string) => void;
    renderizar: (obj: T) => React.ReactNode;
}

export class CrudExclusao<T extends ICrudModel> extends React.Component<Props<T>, State<T>> {
    constructor(props){
        super(props);
        this.state = {
            objeto: this.props.objeto
        }
    }

    render()
    {
        return (
            <div>
                <div>                    
                    <button type="button" onClick={() => this.props.excluir(this.state.objeto.id)} className="btn btn-danger mr-1">Excluir</button>
                    <button type="button" onClick={() => this.props.voltar()} className="btn btn-secondary mr-1">Voltar</button>
                    {this.props.renderizar(this.state.objeto)}
                </div>
            </div>
        );
    }
}