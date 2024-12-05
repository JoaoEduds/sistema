import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { incluirFornecedor, atualizarFornecedor } from '../../../redux/fornecedorReducer';
import toast, {Toaster} from 'react-hot-toast';
import ESTADO from '../../../redux/estados';

export default function FormCadFornecedor(props) {
    
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const {estado, mensagem} = useSelector((state)=>state.fornecedor);
    const despachante = useDispatch();
    
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirFornecedor(fornecedor));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    setFornecedor({
                        codigo:0,
                        nome:"",
                        cnpj:"",
                        bairro:"",
                        cidade:"",
                        endereco:"",
                        cep:"",
                        tel:"",
                        email:""
                    });
                },5000);
            }
            else {
                despachante(atualizarFornecedor(fornecedor));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    props.setModoEdicao(false);
                    props.setFornecedorSelecionado({
                        codigo:0,
                        nome:"",
                        cnpj:"",
                        bairro:"",
                        cidade:"",
                        endereco:"",
                        cep:"",
                        tel:"",
                        email:""
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

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setFornecedor({...fornecedor, [elemento]:valor});
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
                            value={fornecedor.nome}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Cnpj:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cnpj"
                            name="cnpj"
                            value={fornecedor.cnpj}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Bairro:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Bairro"
                            name="bairro"
                            value={fornecedor.bairro}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cidade"
                            name="cidade"
                            value={fornecedor.cidade}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group as={Col} md="6" controlId="validationFormik04">
                        <Form.Label>Endereço:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="endereco"
                            name="endereco"
                            value={fornecedor.endereco}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Cep:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cep"
                            name="cep"
                            value={fornecedor.cep}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-4" >
                    <Form.Group as={Col} md="6" controlId="validationFormik04">
                        <Form.Label>Telefone:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Telefone"
                            name="tel"
                            value={fornecedor.tel}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationFormikUsername">
                        <Form.Label>E-mail</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="E-mail"
                                aria-describedby="inputGroupPrepend"
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>

                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                    </Col>
                    <Col md={{offset:1}}> 
                        <Button onClick={() => {
                            if(props.setModoEdicao){
                                props.setModoEdicao(false);
                                props.setFornecedorSelecionado({
                                    codigo:0,
                                    nome:"",
                                    cnpj:"",
                                    bairro:"",
                                    cidade:"",
                                    endereco:"",
                                    cep:"",
                                    tel:"",
                                    email:""
                                });
                            }
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}