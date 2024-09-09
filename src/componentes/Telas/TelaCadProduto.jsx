import CadProduto from "./Cadastros/CadProduto";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelasProdutos";
import { produtos } from "../../dados/mockProdutos"

export default function TelaCadProduto(props){
    const [exibirTabela, setExibirTabela] = useState(true);

    return (
        <div>
            <Pagina>
                <Alert class="alert alert-success" role="alert">
                    <h2>
                        Cadastro de Produto
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={produtos} setExibirTabela={setExibirTabela}/> : 
                        <CadProduto setExibirTabela={setExibirTabela}/>    
                }
            </Pagina>
        </div>
    );
}