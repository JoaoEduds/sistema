import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";
import { useSelector } from "react-redux";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const { usuario, setUsuario } = useContext(ContextoUsuario);
    const listaDeUsuarios = useSelector((state) => state.usuario.listaDeUsuarios);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senha.current.value;

        console.log("Usuário digitado:", usuarioDigitado);
        console.log("Senha digitada:", senhaDigitada);

        if (usuarioDigitado === "admin" && senhaDigitada === "admin") {
            setUsuario({
                usuario: usuarioDigitado,
                logado: true,
            });
        } else {
            const usuarioEncontrado = listaDeUsuarios.find(
                (user) => user.nome === usuarioDigitado && user.senha === senhaDigitada
            );
            if (usuarioEncontrado) {
                setUsuario({
                    usuario: usuarioEncontrado.nome,
                    logado: true,
                });
            } else {
                alert("Usuário ou senha incorretos. Tente novamente.");
            }
        }
    }

    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário"
                        ref={nomeUsuario}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        ref={senha}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}