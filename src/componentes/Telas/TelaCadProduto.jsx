import CadProduto from "./Cadastros/CadProduto";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelasProdutos";
import { produtos } from "../../dados/mockProdutos"

export default function TelaCadProduto(props){
    const [exibirTabela, setExibirTabela] = useState(true);

    const [listaDeProdutos, setListaDeProdutos] = useState(produtos);

    //const [produtoEdita, setprodutoEdita] = useState(false);

    const [modoEdicao,setModoEdicao] = useState(false);
    
    const [produtoSelecionado,setProdutoSelecionado] = useState({
        codigo:0,
        descricao:"",
        precoCusto:0,
        precoVenda:0,
        qtdEstoque:0,
        urlImagem:"",
        dataValidade:""
    });


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
                        <TabelaProdutos listaDeProdutos={listaDeProdutos}
                                        setListaDeProdutos={setListaDeProdutos} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setProdutoSelecionado={setProdutoSelecionado}/>: 
                        <CadProduto listaDeProdutos={listaDeProdutos}
                                    setListaDeProdutos={setListaDeProdutos} 
                                    setExibirTabela={setExibirTabela}
                                    produtoSelecionado={produtoSelecionado}
                                    setProdutoSelecionado={setProdutoSelecionado}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}/>  
                }
            </Pagina>
        </div>
    );
}