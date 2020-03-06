import * as React from 'react';
import { ICrudModel } from './crud-model';

interface State<T extends ICrudModel>{
    objeto: T;
}

interface Props<T extends ICrudModel>{
    objeto: T;
    voltar: () => void;
    renderizar: (obj: T) => React.ReactNode;
}

export class CrudConsulta<T extends ICrudModel> extends React.Component<Props<T>, State<T>> {
    constructor(props){
        super(props);
        this.state = {
            objeto: props.objeto
        }
    }

    render()
    {
        return (
            <div>
                <div>                    
                    <button onClick={() => this.props.voltar()} className="btn btn-secondary mr-1">Voltar</button>
                    {this.props.renderizar(this.state.objeto)}
                </div>
            </div>
        );
    }
}