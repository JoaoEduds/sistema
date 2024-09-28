import { Alert } from "react-bootstrap";
import FormCadUsuario from "./Formularios/FormCadUsuario";
import Pagina from '../layouts/Pagina'
import { useState } from "react";
import TabelaUsuario from "./Tabelas/TabelaUsuario";
import {usuarios} from "../../dados/mockUsuarios";

export default function TelaCadastroUsuario(props)
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios] = useState(usuarios);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        nome:"",
        senha:"",
        email:"",
        tipo:""
    });
    return (
        <>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Usuarios
                    </h2>
                </Alert>
                {
                    exibirTabela ? 
                        <TabelaUsuario listaDeUsuarios={listaDeUsuarios}
                                        setListaDeUsuarios={setListaDeUsuarios}
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setUsuarioSelecionado={setUsuarioSelecionado}/> : 
                        <FormCadUsuario listaDeUsuarios={listaDeUsuarios}
                                            setListaDeUsuarios={setListaDeUsuarios}
                                            setExibirTabela={setExibirTabela}
                                            usuarioSelecionado={usuarioSelecionado}
                                            setUsuarioSelecionado={setUsuarioSelecionado}
                                            modoEdicao={modoEdicao}
                                            setModoEdicao={setModoEdicao}
                        />
                    }
            </Pagina>
        </>
    );

}