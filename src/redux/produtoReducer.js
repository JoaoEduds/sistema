import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarProduto, excluirProduto, gravarProduto, alterarProduto } from "../servicos/servicoProduto";

import ESTADO from "./estados";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async ()=>{
    //lista de produtos
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Produtos recuperados com sucesso",
                "listaDeProdutos":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeProdutos":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeProdutos":[]
        }
    }
});

export const apagarProduto = createAsyncThunk('apagarProduto', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirProduto(produto);
    //se for um array/lista a consulta funcionou
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "codigo":produto.codigo
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

export const incluirProduto = createAsyncThunk('incluirProduto', async (produto)=>{
    //Privisibildade de comportamento ao  que sera retornado para a aplicação (redutor)
    //status e mensagem 
    //sucesso o cod do produto gerado na inclusao
    try {
        const resultado = await gravarProduto(produto);
        if(resultado.status){
            produto.codigo = resultado.codigo;
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "produto":produto
            } 
        }else{
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            };
        }
    } catch (error) {
        return{
            "status":false,
            "mensagem":"Não foi possivel se comunicar com o backend: "+error.message
        }
    }
});

export const atualizarProduto = createAsyncThunk('atualizarProduto', async (produto)=>{
    //Privisibildade de comportamento ao  que sera retornado para a aplicação (redutor)
    //status e mensagem 
    //sucesso o cod do produto gerado na inclusao
    try {
        const resultado = await alterarProduto(produto);
        produto.codigo = resultado.codigo;
        return{
            "status":resultado.status,
            "mensagem":resultado.mensagem,
            "produto":produto
        }
    } catch (error) {
        return{
            "status":false,
            "mensagem":"Não foi possivel se comunicar com o backend: "+error.message
        }
    }
});

const produtoReducer = createSlice({
    name:'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeProdutos:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarProdutos.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarProdutos.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
          } 
        })
        .addCase(buscarProdutos.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.error?.message || "Erro inesperado";
            state.listaDeProdutos=action.payload.listaDeProdutos;
        })
        .addCase(apagarProduto.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (excluindo produto do backend!)";
        })
        .addCase(apagarProduto.fulfilled,(state,action) =>{
            state.mensagem=action.payload.mensagem;
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.listaDeProdutos = state.listaDeProdutos.filter((item)=>item.codigo !== action.payload.codigo);
            }else{
                state.estado=ESTADO.ERRO;
            }
        })
        .addCase(apagarProduto.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.error?.message || "Erro inesperado";
        })
        .addCase(incluirProduto.pending,(state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição (incluir produto no backend)";
        })
        .addCase(incluirProduto.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaDeProdutos.push(action.payload.produto);
            }else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(incluirProduto.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.error?.message || "Erro inesperado";
        })
        .addCase(atualizarProduto.pending,(state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição (atualizar produto no backend)";
        }).addCase(atualizarProduto.fulfilled,(state,action)=>{
            if(action.payload.status){
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensgem;
            state.listaDeProdutos = state.listaDeProdutos.map((item)=>item.codigo === action.payload.produto.codigo ? action.payload.produto : item);
            }else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensgem;
            }
        }).addCase(atualizarProduto.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.error?.message || "Erro inesperado.";
        })
    }
});

export default produtoReducer.reducer;