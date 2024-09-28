import { Button, Container, Table } from "react-bootstrap";

export default function TabelaFornecedor(props) {
    function editarFornecedor(fornecedor) {
        props.setModoEdicao(true);
        props.setFornecedorSelecionado(fornecedor);
        props.setExibirTabela(false);
    }

    function excluirFornecedor(fornecedor) {
        if (window.confirm("Deseja realmente excluir o fornecedor " + fornecedor.nome)) {
            props.setListaDeFornecedores(
                props.listaDeFornecedores.filter((item) => {
                    return item.cnpj !== fornecedor.cnpj;
                })
            );
        }
    }

    return (
        <>
            <Container>
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => {
                        props.setExibirTabela(false);
                    }}
                >
                    Adicionar
                </Button>
                <Table className="text-center" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Rua</th>
                            <th>Número</th>
                            <th>CEP</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listaDeFornecedores?.map((fornecedor) => (
                            <tr key={fornecedor.cnpj}>
                                <td>{fornecedor.nome}</td>
                                <td>{fornecedor.cnpj}</td>
                                <td>{fornecedor.bairro}</td>
                                <td>{fornecedor.cidade}</td>
                                <td>{fornecedor.rua}</td>
                                <td>{fornecedor.num}</td>
                                <td>{fornecedor.cep}</td>
                                <td>{fornecedor.tel}</td>
                                <td>{fornecedor.email}</td>
                                <td>
                                    <Button
                                        onClick={() => editarFornecedor(fornecedor)}
                                        variant="warning"
                                    >
                                        Editar
                                    </Button>{' '}
                                    <Button
                                        onClick={() => excluirFornecedor(fornecedor)}
                                        variant="danger"
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p>Quantidade de fornecedores cadastrados: {props.listaDeFornecedores.length}</p>
            </Container>
        </>
    );
}
