import { Alert } from "react-bootstrap";
import CadCli from "./Cadastros/CadCli";
import Pagina from '../layouts/Pagina'
import { useState } from "react";
import TabCliente from "./Tabelas/TabClientes";

export default function TelaCadCli(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        codigo: 0,
        cpf: "",
        nome: "",
        bairro: "",
        endereco: "",
        cidade: "",
        cep: "",
        email: "",
        tel: ""
    });

    return (
        <>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de clientes
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                                <TabCliente setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setClienteSelecionado={setClienteSelecionado} /> :
                                            
                                <CadCli setExibirTabela={setExibirTabela}
                                        clienteSelecionado={clienteSelecionado}
                                        setClienteSelecionado={setClienteSelecionado}
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao}/>}
            </Pagina>
        </>
    );

}