import { Alert } from "react-bootstrap";
import CadCli from "./Cadastros/CadCli";
import Pagina from '../layouts/Pagina'
import { useState } from "react";
import TabCliente from "./Tabelas/TabClientes";
import { clientes } from "../../dados/mockClientes"

export default function TelaCadCli(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeClientes, setListaDeClientes] = useState([...clientes]);
    const [modoDeCadastro, setModoDeCadastro] = useState(true);
    const [clienteAlter, setClienteAlter] = useState(null);
    return (
        <>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de clientes
                    </h2>
                </Alert>
                {exibirTabela ? <TabCliente modoDeCadastro={modoDeCadastro}
                                            setModoDeCadastro={setModoDeCadastro}
                                            clienteAlter={clienteAlter}
                                            setClienteAlter={setClienteAlter}
                                            listaDeClientes={listaDeClientes}
                                            setListaDeClientes={setListaDeClientes}
                                            setExibirTabela={setExibirTabela} /> :
                                            
                                <CadCli     modoDeCadastro={modoDeCadastro}
                                            clienteAlter={clienteAlter}
                                            setClienteAlter={setClienteAlter}
                                            setModoDeCadastro={setModoDeCadastro}
                                            listaDeClientes={listaDeClientes}
                                            setListaDeClientes={setListaDeClientes}
                                            setExibirTabela={setExibirTabela}/>}
            </Pagina>
        </>
    );

}