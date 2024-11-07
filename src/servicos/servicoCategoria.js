const urlBase = 'http://localhost:4000/categoria';

export async function gravar(categoria) {
    const resposta = fetch(urlBase,{
        'method':"POST",
        'headers':{
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(categoria)
    });
    const resultado = await resposta.json;
    return resultado;
}
export async function alterar(categoria) {
    const resposta = fetch(urlBase,{
        'method':"PUT",
        'headers':{
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(categoria)
    });
    const resultado = await resposta.json;
    return resultado;
}
export async function excluir(categoria) {
    const resposta = fetch(urlBase + "/" + categoria.codigo,{
        'method':"DELETE"
    });
    const resultado = await resposta.json;
    return resultado;
}
export async function consultarCategoria() {
    const resposta = fetch(urlBase,{
        'method':"GET",
    });
    const resultado = await resposta.json;
    return resultado;
}