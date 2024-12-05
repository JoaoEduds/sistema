import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import TabelaCategorias from "./Tabelas/TabelasCategorias";
import { useState } from "react";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState({
        codigo:0,
        descricao:"",
    });

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setCategoriaSelecionada={setCategoriaSelecionada} /> :
                        <FormCadCategorias setExibirTabela={setExibirTabela}
                                         categoriaSelecionada={categoriaSelecionada}
                                         setCategoriaSelecionada={setCategoriaSelecionada}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao} />
                }
            </Pagina>
        </div>
    );
}