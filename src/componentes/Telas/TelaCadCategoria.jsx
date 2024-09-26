import CadCategoria from "./Cadastros/CadCategoria";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import TabelaCategorias from "./Tabelas/TabelasCategorias";
import { categorias } from "../../dados/mockCategorias";

export default function TelaCadCategoria(props){
    const [exibirTabela, setExibirTabela] = useState(true);

    const [listaDeCategorias, setListaDeCategorias] = useState(categorias);

    const [modoEdicao,setModoEdicao] = useState(false);
    
    const [categoriaSelecionada,setCategoriaSelecionada] = useState({
        codigo:0,
        descricao:"",
    });
    
    return (
        <div>
            <Pagina>
                <Alert class="alert alert-success" role="alert">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias   listaDeCategorias={listaDeCategorias}
                                            setListaDeCategorias={setListaDeCategorias} 
                                            setExibirTabela={setExibirTabela}
                                            setModoEdicao={setModoEdicao}
                                            setCategoriaSelecionada={setCategoriaSelecionada}/>:
                        <CadCategoria   listaDeCategorias={listaDeCategorias}
                                        setListaDeCategorias={setListaDeCategorias} 
                                        setExibirTabela={setExibirTabela}
                                        categoriaSelecionada={categoriaSelecionada}
                                        setCategoriaSelecionada={setCategoriaSelecionada}
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao}/>
                }
            </Pagina>
        </div>
    );
}