import * as React from 'react';
import { CrudConsulta } from './crud-consulta'
import { CrudInclusao } from './crud-inclusao'
import { CrudAlteracao } from './crud-alteracao'
import { CrudLista } from './crud-lista'
import { CrudExclusao } from './crud-exclusao'

import { ICrudModel } from './crud-model'
import { ICrudComunicador } from './crud-comunicacao-padrao/crud-comunicador-interface';
import { CrudComunicadorRest } from './crud-comunicacao-padrao/crud-comunicador-rest';

interface State<T extends ICrudModel> {
    tipoAcao: number;
    objeto: T;
    lista: T[];
    comunicador: ICrudComunicador<T>;
}

interface Props<T extends ICrudModel>{
    controlador : string;
    obterNovaInstancia : () => T;
    renderizarConsulta : (obj: T) => React.ReactNode;
    renderizarInclusao : (metodoLigacao: (e) => void) => React.ReactNode;
    renderizarAlteracao : ( metodoLigacao: (e) => void, obj: T ) => React.ReactNode;
    renderizarExclusao : (obj: T) => React.ReactNode;
    renderizarListaCabecalho : () => React.ReactNode[];
    renderizarListaLinha : (obj: T) => React.ReactNode[];
}

export class Crud<T extends ICrudModel> extends React.Component<Props<T>, State<T>> {
    constructor(props){
        super(props);
        this.state = {
            tipoAcao: this.TipoAcao.carregando,
            objeto: null,
            lista: [],
            comunicador: new CrudComunicadorRest<T>()
        }

        this.listar = this.listar.bind(this);
        this.incluir = this.incluir.bind(this);
        this.alterar = this.alterar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.apresentarLista = this.apresentarLista.bind(this);
        this.abrirConsulta = this.abrirConsulta.bind(this);
        this.abrirAlteracao = this.abrirAlteracao.bind(this);
        this.abrirExclusao = this.abrirExclusao.bind(this);
        this.abrirInclusao = this.abrirInclusao.bind(this);
        this.falhar = this.falhar.bind(this);
    }

    render()
    {
        var conteudo;
        
        if (this.state.tipoAcao == this.TipoAcao.carregando)
        {
            conteudo = <p>Carregando...</p>;
            this.listar();
        }
        else if (this.state.tipoAcao == this.TipoAcao.consultando)
            conteudo = <CrudConsulta<T> objeto = {this.state.objeto} voltar = {this.listar} renderizar = {this.props.renderizarConsulta} />
        else if (this.state.tipoAcao == this.TipoAcao.incluindo)
            conteudo = <CrudInclusao<T> objeto = {this.props.obterNovaInstancia()} voltar = {this.listar} incluir = {this.incluir} renderizar = {this.props.renderizarInclusao} />;
        else if (this.state.tipoAcao == this.TipoAcao.alterando)
            conteudo = <CrudAlteracao<T> objeto = {this.state.objeto} voltar = {this.listar} alterar = {this.alterar} renderizar = {this.props.renderizarAlteracao} />;
        else if (this.state.tipoAcao == this.TipoAcao.excluindo)
            conteudo = <CrudExclusao<T> objeto = {this.state.objeto} voltar = {this.listar} excluir = {this.excluir} renderizar = {this.props.renderizarExclusao} />;
        else
            conteudo = <CrudLista<T> lista = {this.state.lista} abrirInclusao = {this.abrirInclusao} abrirConsulta = {this.abrirConsulta} abrirExclusao = {this.abrirExclusao}  abrirAlteracao = {this.abrirAlteracao} renderizarCabecalho = {this.props.renderizarListaCabecalho} renderizarLinha = {this.props.renderizarListaLinha} />
        
        return (
            <div>
                {conteudo}
            </div>
        );
    }
    
    falhar(mensagem: string)
    {
        
    }

    listar()
    {
        this.state.comunicador.listar(this.props.controlador, this.apresentarLista, this.falhar);
    }

    incluir(obj: T)
    {
        this.state.comunicador.incluir(this.props.controlador, obj, this.listar, this.falhar);
    }

    alterar(obj: T, id : string)
    {
        this.state.comunicador.alterar(this.props.controlador, obj, id, this.listar, this.falhar);
    }

    excluir(id : string)
    {
        this.state.comunicador.excluir(this.props.controlador, id, this.listar, this.falhar);
    }

    apresentarLista(novaLista: T[])
    {
        this.setState({ lista : novaLista, objeto: null, tipoAcao: this.TipoAcao.listando });
    }

    abrirConsulta(obj: T)
    {
        this.setState({ objeto: obj, tipoAcao: this.TipoAcao.consultando });
    }
    
    abrirInclusao()
    {
        this.setState({ objeto: this.props.obterNovaInstancia(), tipoAcao: this.TipoAcao.incluindo });
    }

    abrirExclusao(obj: T)
    {
        this.setState({ objeto: obj, tipoAcao: this.TipoAcao.excluindo });
    }

    abrirAlteracao(obj: T)
    {
        this.setState({ objeto: obj, tipoAcao: this.TipoAcao.alterando });
    }

    TipoAcao = Object.freeze({"carregando": 1, "listando": 2, "consultando": 3, "incluindo": 4, "alterando": 5, "excluindo": 6});
}