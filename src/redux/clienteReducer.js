import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCliente, excluirCliente, gravarCliente, alterarCliente } from "../servicos/servicoCliente";

import ESTADO from "./estados";

export const buscarCliente = createAsyncThunk('buscarCliente', async () => {
    const resultado = await consultarCliente();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Clientes recuperados com sucesso",
                "listaDeClientes": resultado
            };
        } else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os clientes do backend.",
                "listaDeClientes": []
            };
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaDeClientes": []
        };
    }
});

export const apagarCliente = createAsyncThunk('apagarCliente', async (cliente) => {
    const resultado = await excluirCliente(cliente);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": cliente.codigo
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        };
    }
});

export const incluirCliente = createAsyncThunk('incluirCliente', async (cliente) => {
    try {
        const resultado = await gravarCliente(cliente);
        if (resultado.status) {
            cliente.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "cliente": cliente
            };
        } else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem
            };
        }
    } catch (error) {
        return {
            "status": false,
            "mensagem": "Não foi possível se comunicar com o backend: " + error.message
        };
    }
});

export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    try {
        const resultado = await alterarCliente(cliente);
        cliente.codigo = resultado.codigo;
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "cliente": cliente
        };
    } catch (error) {
        return {
            "status": false,
            "mensagem": "Não foi possível se comunicar com o backend: " + error.message
        };
    }
});

// Slice do Redux
const clienteReducer = createSlice({
    name: 'cliente',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeClientes: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarCliente.pending, (state) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (buscando cliente)";
        })
            .addCase(buscarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes = action.payload.listaDeClientes;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes = action.payload.listaDeClientes;
                }
            })
            .addCase(buscarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao buscar clientes.";
                state.listaDeClientes = [];
            })
            .addCase(apagarCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (excluindo cliente do backend!)";
            })
            .addCase(apagarCliente.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaDeClientes = state.listaDeClientes.filter((item) => item.codigo !== action.payload.codigo);
                } else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(apagarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao excluir cliente.";
            })
            .addCase(incluirCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (incluir cliente no backend)";
            })
            .addCase(incluirCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes.push(action.payload.cliente);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao incluir cliente.";
            })
            .addCase(atualizarCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (atualizar cliente no backend)";
            })
            .addCase(atualizarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes = state.listaDeClientes.map((item) =>
                        item.codigo === action.payload.cliente.codigo ? action.payload.cliente : item
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao atualizar cliente.";
            });
    }
});

export default clienteReducer.reducer;