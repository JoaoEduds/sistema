import { Button, Container, Table } from "react-bootstrap";

export default function TabelaUsuario(props) {
    function editarUsuario(usuario) {
        props.setModoEdicao(true);
        props.setUsuarioSelecionado(usuario);
        props.setExibirTabela(false);
    }

    function excluirUsuario(usuario) {
        if (window.confirm("Deseja realmente excluir o usuário " + usuario.nome + "?")) {
            props.setListaDeUsuarios(
                props.listaDeUsuarios.filter((item) => {
                    return item.senha !== usuario.senha;
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
                            <th>Senha</th>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listaDeUsuarios?.map((usuario) => (
                            <tr key={usuario.senha}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.senha}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.tipo}</td>
                                <td>
                                    <Button
                                        onClick={() => editarUsuario(usuario)}
                                        variant="warning"
                                        className="me-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={() => excluirUsuario(usuario)}
                                        variant="danger"
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p>Quantidade de usuários cadastrados: {props.listaDeUsuarios.length}</p>
            </Container>
        </>
    );
}
