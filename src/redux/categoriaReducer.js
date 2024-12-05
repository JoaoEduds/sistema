import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCategoria, excluirCategoria, gravarCategoria, alterarCategoria } from "../servicos/servicoCategoria";

import ESTADO from "./estados";

export const buscarCategoria = createAsyncThunk('buscarCategoria', async ()=>{
    const resultado = await consultarCategoria();
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Categorias recuperadas com sucesso",
                "listaDeCategorias":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os categoria do backend.",
                "listaDeCategorias":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeCategorias":[]
        }
    }
});

export const apagarCategoria = createAsyncThunk('apagarCategoria', async (categoria)=>{
    console.log(categoria);
    const resultado = await excluirCategoria(categoria);
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "codigo":categoria.codigo
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

export const incluirCategoria = createAsyncThunk('incluirCategoria', async (categoria)=>{
    try {
        const resultado = await gravarCategoria(categoria);
        if(resultado.status){
            categoria.codigo = resultado.codigo;
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "categoria":categoria
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

export const atualizarCategoria = createAsyncThunk('atualizarCategoria', async (categoria)=>{
    try {
        const resultado = await alterarCategoria(categoria);
        categoria.codigo = resultado.codigo;
        return{
            "status":resultado.status,
            "mensagem":resultado.mensagem,
            "categoria":categoria
        }
    } catch (error) {
        return{
            "status":false,
            "mensagem":"Não foi possivel se comunicar com o backend: "+error.message
        }
    }
});

const categoriaReducer = createSlice({
    name:'categoria',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeCategorias:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarCategoria.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando categoria)"
        })
        .addCase(buscarCategoria.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
        })
        .addCase(buscarCategoria.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
        })
        .addCase(apagarCategoria.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (excluindo categoria do backend!)";
        })
        .addCase(apagarCategoria.fulfilled,(state,action) =>{
            state.mensagem=action.payload.mensagem;
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.listaDeCategorias = state.listaDeCategorias.filter((item)=>item.codigo !== action.payload.codigo);
            }else{
                state.estado=ESTADO.ERRO;
            }
        })
        .addCase(apagarCategoria.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(incluirCategoria.pending,(state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição (incluir categoria no backend)";
        })
        .addCase(incluirCategoria.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaDeCategorias.push(action.payload.categoria);
            }else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(incluirCategoria.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarCategoria.pending,(state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição (atualizar categoria no backend)";
        })
        .addCase(atualizarCategoria.fulfilled,(state,action)=>{
            if(action.payload.status){
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias = state.listaDeCategorias.map((item)=>item.codigo === action.payload.categoria.codigo ? action.payload.categoria : item);
            }else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarCategoria.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default categoriaReducer.reducer;