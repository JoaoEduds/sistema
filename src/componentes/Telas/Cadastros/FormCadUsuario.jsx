import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidade, setFormValidade] = useState(false);
    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o produto
                props.setListaDeUsuarios([...props.listaDeUsuarios, usuario]);
                //exibir tabela com o produto incluído
                props.setExibirTabela(true);
            }
            else{
                //editar o produto
                /*altera a ordem dos registros
                props.setListaDeProdutos([...props.listaDeProdutos.filter(
                    (item) => {
                        return item.codigo !== produto.codigo;
                    }
                ), produto]);*/

                //não altera a ordem dos registros
                props.setListaDeUsuarios(props.listaDeUsuarios.map((item) => {
                    if (item.senha !== usuario.senha)
                        return item
                    else
                        return usuario
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    nome:"",
                    senha:"",
                    email:"",
                    tipo:""
                });
                props.setExibirTabela(true);
            }

        }
        else{
            setFormValidade(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setUsuario({...usuario, [elemento]:valor});
    }

    return (
        <>
            <Form noValidate validated={formValidade} onSubmit={manipularSubmissao}>

                <Row className="mb-4">
                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={usuario.nome}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Senha"
                            name="senha"
                            value={usuario.senha}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={usuario.email}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Tipo:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tipo"
                            name="tipo"
                            value={usuario.tipo}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                    </Col>
                    <Col md={{offset:1}}> 
                        <Button onClick={() => {
                            props.setExibirTabela(true)
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}