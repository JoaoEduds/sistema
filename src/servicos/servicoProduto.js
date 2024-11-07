const urlBase = 'http://localhost:4000/produto';

export async function gravarProduto(produto) {
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
export async function alterarProduto(produto) {
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
export async function excluirProduto(produto) {
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