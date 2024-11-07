const urlBase = 'http://localhost:4000/produto';

export async function gravar(produto) {
    const resposta = fetch(urlBase,{
        'method':"POST",
        'headers':{
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(produto)
    });
    const resultado = await resposta.json;
    return resultado;
}
export async function alterar(produto) {
    const resposta = fetch(urlBase,{
        'method':"PUT",
        'headers':{
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(produto)
    });
    const resultado = await resposta.json;
    return resultado;
}
export async function excluir(produto) {
    const resposta = fetch(urlBase + "/" + produto.codigo,{
        'method':"DELETE"
    });
    const resultado = await resposta.json;
    return resultado;
}
export async function consultarProduto() {
    const resposta = fetch(urlBase,{
        'method':"GET",
    });
    const resultado = await resposta.json;
    return resultado;
}