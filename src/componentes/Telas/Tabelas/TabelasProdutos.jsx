import { Button, Container, Table } from "react-bootstrap";

export default function TabelaProdutos(props){
    
    function excluirProduto(produto){
        if(window.confirm("Deseja realmente excluir o produto " + produto.descricao)){
            // abordando utilizando a sintaxe permitida da linguagem
            props.setListaDeProdutos(props.listaDeProdutos.filter(
                (item)=>{
                    return item.codigo != produto.codigo
                }));
        }

        //abordagem elementar
        /*let novaLista = []
        for (let i=0; i<props.listaDeProdutos.length; i++){
            if(props.listaDeProdutos[i].codigo != produto.codigo){
                novaLista.push(props.listaDeProdutos[i])
            }
        }
        props*/

    }

    function alterarProduto(produto) {
        props.setprodutoEdita(produto);
        props.setExibirTabela(false);
    }
    
    return(
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={()=>{
                    props.setExibirTabela(false);
                    props.setprodutoEdita(false);
                }}>Adicionar</Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Codigo</th>
                        <th>Descrição</th>
                        <th>Preço de Custo</th>
                        <th>Preço de Venda</th>
                        <th>Qntd. em estoque</th>
                        <th>Imagem</th>
                        <th>Validade</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeProdutos?.map((produto) => {
                                return(
                                    <tr>
                                        <td>{produto.codigo}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.precoCusto}</td>
                                        <td>{produto.precoVenda}</td>
                                        <td>{produto.qtdEstoque}</td>
                                        <td><img style={{
                                            "width":"60px",
                                            "height":"60px"
                                        }} scr={produto.urlImagem} alt="foto do produto"/></td>
                                        <td>{produto.dataValidade}</td>
                                        <td>
                                            <Button onClick={()=>{
                                                alterarProduto(produto);
                                            }} variant="warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                                </svg>
                                            </Button> <Button onClick={()=>{
                                                excluirProduto(produto);
                                            }} variant="danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                    </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}