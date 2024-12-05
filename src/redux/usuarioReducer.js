import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, excluirUsuario, gravarUsuario, alterarUsuario } from "../servicos/servicoUsuario";
import ESTADO from "./estados";

// Funções Assíncronas
export const buscarUsuario = createAsyncThunk('buscarUsuario', async () => {
    try {
        const resultado = await consultarUsuario();
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Usuários recuperados com sucesso.",
                listaDeUsuarios: resultado
            };
        } else {
            throw new Error("Erro ao recuperar os usuários do backend.");
        }
    } catch (erro) {
        throw new Error(erro.message || "Erro inesperado ao buscar usuários.");
    }
});

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario) => {
    try {
        const resultado = await excluirUsuario(usuario);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem || "Usuário excluído com sucesso.",
            codigo: usuario.codigo
        };
    } catch (erro) {
        throw new Error(erro.message || "Erro inesperado ao excluir usuário.");
    }
});

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario) => {
    try {
        const resultado = await gravarUsuario(usuario);
        if (resultado.status) {
            return {
                status: true,
                mensagem: resultado.mensagem || "Usuário incluído com sucesso.",
                usuario: { ...usuario, codigo: resultado.codigo }
            };
        } else {
            throw new Error(resultado.mensagem || "Erro ao incluir usuário.");
        }
    } catch (erro) {
        throw new Error(erro.message || "Erro inesperado ao incluir usuário.");
    }
});

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resultado = await alterarUsuario(usuario);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem || "Usuário atualizado com sucesso.",
            usuario: { ...usuario, codigo: resultado.codigo }
        };
    } catch (erro) {
        throw new Error(erro.message || "Erro inesperado ao atualizar usuário.");
    }
});

// Slice do Redux
const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (buscando usuários)";
            })
            .addCase(buscarUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaDeUsuarios = action.payload.listaDeUsuarios;
            })
            .addCase(buscarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message || "Erro inesperado ao buscar usuários.";
            })

            .addCase(apagarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (excluindo usuário)";
            })
            .addCase(apagarUsuario.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.listaDeUsuarios = state.listaDeUsuarios.filter((item) => item.codigo !== action.payload.codigo);
                }
            })
            .addCase(apagarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message || "Erro inesperado ao excluir usuário.";
            })

            .addCase(incluirUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (incluir usuário)";
            })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.listaDeUsuarios.push(action.payload.usuario);
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message || "Erro inesperado ao incluir usuário.";
            })

            .addCase(atualizarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (atualizar usuário)";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.listaDeUsuarios = state.listaDeUsuarios.map((item) =>
                        item.codigo === action.payload.usuario.codigo ? action.payload.usuario : item
                    );
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message || "Erro inesperado ao atualizar usuário.";
            });
    }
});

export default usuarioReducer.reducer;