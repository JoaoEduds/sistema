import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function CadEntregador(props) {
    
    const [entregador, setEntregador] = useState(props.entregadorSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            if(!props.modoEdicao){
                //cadastrar o produto
                props.setListaDeEntregadores([...props.listaDeEntregadores, entregador]);
                //exibir tabela com o produto incluído
                props.setExibirTabela(true);
            }
            else{
                props.setListaDeEntregadores(props.listaDeEntregadores.map((item)=>{
                    if(item.cpf !== entregador.cpf)
                        return item;
                    else
                        return entregador;
                }));
                //voltar para o modo inclusão
                props.setModoEdicao(false);
                props.setEntregadorSelecionado({
                    cpf:"000.000.000-00",
                    nome:"",
                    data:"",
                    numero:"",
                    veiculo:"",
                    endereco:""
                });
                props.setExibirTabela(true);
            }
        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setEntregador({...entregador, [elemento]:valor});
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={entregador.cpf}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o seu CPF!</Form.Control.Feedback>
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
                        value={entregador.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe seu nome!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          id="data"
                          name="data"
                          aria-describedby="precoCusto"
                          value={entregador.data}
                          onChange={manipularMudanca}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe sua data de nascimento!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Numero</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="numero">18</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="numero"
                            name="numero"
                            aria-describedby="numero"
                            value={entregador.numero}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe seu numero!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Veiculo</Form.Label>
                        <Form.Control
                            type="text"
                            id="veiculo"
                            name="veiculo"
                            value={entregador.veiculo}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a quantidade em estoque!
                        </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={entregador.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}