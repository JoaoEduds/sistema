import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { incluirCliente, atualizarCliente } from '../../../redux/clienteReducer';
import toast, {Toaster} from 'react-hot-toast';
import ESTADO from '../../../redux/estados';

export default function CadCli(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [temCategorias, setTemCategorias] = useState(false);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const {estado, mensagem} = useSelector((state)=>state.produto);
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                //cadastrar o produto
                despachante(incluirCliente(cliente));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    setCliente({
                        codigo: 0,
                        cpf: "",
                        nome: "",
                        bairro: "",
                        endereco: "",
                        cidade: "",
                        cep: "",
                        email: "",
                        tel: ""
                    });
                },5000);
            }
            else {
                despachante(atualizarCliente(cliente));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    props.setModoEdicao(false);
                    props.setClienteSelecionado({
                        codigo: 0,
                        cpf: "",
                        nome: "",
                        bairro: "",
                        endereco: "",
                        cidade: "",
                        cep: "",
                        email: "",
                        tel: ""
                    });
                    props.setExibirTabela(true);
                },3000);
            }
        }else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }
    
    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setCliente({ ...cliente, [elemento]: valor });
    }
    
    if(estado === ESTADO.PENDENTE){
        return (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{ mensagem }</Alert>
            </div>
        );
    } else if (estado === ESTADO.ERRO){
        return(
            <div>
                <Alert variant="danger">{ mensagem }</Alert>
                <Button onClick={() => {
                                props.setExibirTabela(true);
                        }}>Voltar</Button>
            </div>
        );
    }
    else if (ESTADO.OCIOSO) {
        return (
            <div>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={cliente.codigo}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do cliente!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={cliente.cpf}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe o CPF do cliente!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="nome"
                                name="nome"
                                value={cliente.nome}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe o Nome do client!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Bairro</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="bairro"
                                    name="bairro"
                                    aria-describedby="bairro"
                                    value={cliente.bairro}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Por favor, informe o bairro do cliente!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Endereço</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="endereco"
                                    name="endereco"
                                    aria-describedby="endereco"
                                    value={cliente.endereco}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Por favor, informe o endereco do cliente!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Cidade</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="cidade"
                                    name="cidade"
                                    aria-describedby="cidade"
                                    value={cliente.cidade}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Por favor, informe a cidade do cliente!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>CEP</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    aria-describedby="cep"
                                    value={cliente.cep}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Por favor, informe o CEP do cliente!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="email"
                                    name="email"
                                    aria-describedby="email"
                                    value={cliente.email}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Por favor, informe o email do cliente!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Telefone</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="tel"
                                    name="tel"
                                    aria-describedby="tel"
                                    value={cliente.tel}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o Telefone do cliente!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                if(props.setModoEdicao){
                                    props.setModoEdicao(false);
                                    props.setClienteSelecionado({
                                        codigo: 0,
                                        cpf: "",
                                        nome: "",
                                        bairro: "",
                                        endereco: "",
                                        cidade: "",
                                        cep: "",
                                        email: "",
                                        tel: ""
                                    });
                                }
                                props.setExibirTabela(true);
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                    <Toaster position="top-right"/>
                </Form>
                {
                    mensagemExibida ? <Alert variant='sucess'>{mensagem}</Alert> : ""
                }
            </div> 
        )
    }
}