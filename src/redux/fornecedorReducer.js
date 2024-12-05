import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarFornecedor, excluirFornecedor, gravarFornecedor, alterarFornecedor } from "../servicos/servicoFornecedor";

import ESTADO from "./estados";

// Funções Assíncronas
export const buscarFornecedor = createAsyncThunk('buscarFornecedor', async () => {
    try {
        const resultado = await consultarFornecedor();
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Fornecedores recuperados com sucesso",
                listaDeFornecedores: resultado
            };
        } else {
            throw new Error("Erro ao recuperar os fornecedores do backend.");
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.message || "Erro inesperado ao buscar fornecedores.",
            listaDeFornecedores: []
        };
    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async (fornecedor) => {
    try {
        const resultado = await excluirFornecedor(fornecedor);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem || "Fornecedor excluído com sucesso.",
            codigo: fornecedor.codigo
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.message || "Erro inesperado ao excluir fornecedor."
        };
    }
});

export const incluirFornecedor = createAsyncThunk('incluirFornecedor', async (fornecedor) => {
    try {
        const resultado = await gravarFornecedor(fornecedor);
        if (resultado.status) {
            return {
                status: true,
                mensagem: resultado.mensagem || "Fornecedor incluído com sucesso.",
                fornecedor: { ...fornecedor, codigo: resultado.codigo }
            };
        } else {
            throw new Error(resultado.mensagem || "Erro ao incluir fornecedor.");
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.message || "Erro inesperado ao incluir fornecedor."
        };
    }
});

export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async (fornecedor) => {
    try {
        const resultado = await alterarFornecedor(fornecedor);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem || "Fornecedor atualizado com sucesso.",
            fornecedor: { ...fornecedor, codigo: resultado.codigo }
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.message || "Erro inesperado ao atualizar fornecedor."
        };
    }
});

// Slice do Redux
const fornecedorReducer = createSlice({
    name: 'fornecedor',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeFornecedores: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (buscando fornecedor)";
            })
            .addCase(buscarFornecedor.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaDeFornecedores = action.payload.listaDeFornecedores || [];
            })
            .addCase(buscarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao buscar fornecedor.";
            })
            .addCase(apagarFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (excluindo fornecedor)";
            })
            .addCase(apagarFornecedor.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.listaDeFornecedores = state.listaDeFornecedores.filter(
                        (item) => item.codigo !== action.payload.codigo
                    );
                }
            })
            .addCase(apagarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao apagar fornecedor.";
            })
            .addCase(incluirFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (incluir fornecedor)";
            })
            .addCase(incluirFornecedor.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.listaDeFornecedores.push(action.payload.fornecedor);
                }
            })
            .addCase(incluirFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao incluir fornecedor.";
            })
            .addCase(atualizarFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (atualizar fornecedor)";
            })
            .addCase(atualizarFornecedor.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.listaDeFornecedores = state.listaDeFornecedores.map((item) =>
                        item.codigo === action.payload.fornecedor.codigo ? action.payload.fornecedor : item
                    );
                }
            })
            .addCase(atualizarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error?.message || "Erro inesperado ao atualizar fornecedor.";
            });
    }
});

export default fornecedorReducer.reducer;