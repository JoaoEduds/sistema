import CadEntregador from "./Cadastros/CadEntregador";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaEntregadores from "./Tabelas/TabelasEntregador";
import { entregadores } from "../../dados/mockEntregadores"

export default function TelaCadEntregador(props){
    const [exibirTabela, setExibirTabela] = useState(true);

    const [listaDeEntregadores, setListaDeEntregadores] = useState(entregadores);

    const [modoEdicao,setModoEdicao] = useState(false);
    
    const [entregadorSelecionado,setEntregadorSelecionado] = useState({
        cpf:"000.000.000-00",
        nome:"",
        data:"",
        numero:"",
        veiculo:"",
        endereco:""
    });


    return (
        <div>
            <Pagina>
                <Alert class="alert alert-success" role="alert">
                    <h2>
                        Cadastro de Entregadores
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaEntregadores listaDeEntregadores={listaDeEntregadores}
                                            setListaDeEntregadores={setListaDeEntregadores} 
                                            setExibirTabela={setExibirTabela}
                                            setModoEdicao={setModoEdicao}
                                            setEntregadorSelecionado={setEntregadorSelecionado}/>: 
                        <CadEntregador  listaDeEntregadores={listaDeEntregadores}
                                        setListaDeEntregadores={setListaDeEntregadores} 
                                        setExibirTabela={setExibirTabela}
                                        entregadorSelecionado={entregadorSelecionado}
                                        setEntregadorSelecionado={setEntregadorSelecionado}
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao}/>  
                }
            </Pagina>
        </div>
    );
}