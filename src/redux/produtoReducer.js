import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarProduto, deletarProduto } from "../servicos/servicoProduto";
import ESTADO from "./estados";
import { act } from "react";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async ()=>{
    //lista produto
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    try{
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"Produtos recuperados com sucesso",
                "listaDeProdutos":resultado
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend",
                "listaDeProdutos":[]
            }
        }
    }
    catch(erro){
        return{
            "status":false,
            "mensagem":"Erro: "+erro.mensagem,
            "listaDeProdutos":[]
        }
    }
});

export const apagarProduto = createAsyncThunk('apagarProduto', async (produto)=>{
    //dar vivsibilidade ao conteudo do paylaos
    const resultado = await deletarProduto(produto);

    try{
        if(Array.isArray(resultado)){
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem
            }
        }
        else{
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem
            }
        }
    }
    catch(erro){
        return{
            "status":false,
            "mensagem":"Erro: "+erro.mensagem
        }
    }
});

const produtoReducer = createSlice({
    nome: 'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeProdutos:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(buscarProdutos.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produto)"
        })
        .addCase(buscarProdutos.fulfilled, (state, action) => {
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeProdutos=action.payload.listaDeProdutos;
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeProdutos=action.payload.listaDeProdutos;
            }
        })
        .addCase(buscarProdutos.rejected, (state, action) => {
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
        })
        .addCase(apagarProduto.pending, (state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarProduto.fulfilled,(state,action)=>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos 
        })
        .addCase(apagarProduto.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default produtoReducer.reducer;