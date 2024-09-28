import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function CadCli(props) {
    const [cliente, setCliente] = useState({
        cpf: "",
        nome: "",
        bairro: "",
        rua: "",
        numEnd: "",
        cidade: "",
        cep: "",
        email: "",
        tel: ""
    });

    function alterar(ev) {
        props.setListaDeClientes(props.listaDeClientes.map((item) => {
            if(item.cpf === props.clienteAlter.cpf) {
                return props.clienteAlter;
            }
            return item;
        }));
        props.setExibirTabela(true);
        ev.preventDefault();
        ev.stopPropagation();
    }

    const [formValidado, setFormValidado] = useState(false);
    function manipularSubmissao(ev) {
        const form = ev.currentTarget;
        if (form.checkValidity()) {
            //cadastrar o produto
            props.setListaDeClientes([...props.listaDeClientes, cliente]);
            //exibir tabela
            props.setExibirTabela(true);
        }
        else {
            setFormValidado(true);
        }
        ev.preventDefault();
        ev.stopPropagation();
    }

    function manipularMudancaCli(ev) {
        const elemento = ev.target.name;
        const valor = ev.target.value;
        setCliente({ ...cliente, [elemento]: valor });
        console.log(`componente ${elemento}: ${valor}`)
    }

    function manipularAlterCli(ev) {
        const elemento = ev.target.name;
        const valor = ev.target.value;
        props.setClienteAlter({ ...props.clienteAlter, [elemento]: valor });
        console.log(`componente ${elemento}: ${valor}`)
    }

    return (
        <>
            {props.modoDeCadastro ?
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao} >
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                id="nome"
                                type="text"
                                name="nome"
                                value={cliente.nome}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cpf:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CPF"
                                name="cpf"
                                id="cpf"
                                value={cliente.cpf}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Bairro:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bairro"
                                name="bairro"
                                id="bairro"
                                value={cliente.bairro}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cidade:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                name="cidade"
                                id="cidade"
                                value={cliente.cidade}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Rua:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rua"
                                name="rua"
                                id="rua"
                                value={cliente.rua}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Número Endereço:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Número"
                                name="numEnd"
                                id="numEnd"
                                value={cliente.numEnd}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cep:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cep"
                                name="cep"
                                id="cep"
                                value={cliente.cep}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4" >
                        <Form.Group as={Col} md="6" >
                            <Form.Label>E-mail</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="E-mail"
                                    aria-describedby="inputGroupPrepend"
                                    name="email"
                                    id="email"
                                    value={cliente.email}
                                    onChange={manipularMudancaCli}
                                />
                                <Form.Control.Feedback type="invalid">
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Telefone"
                                name="tel"
                                id="tel"
                                value={cliente.tel}
                                onChange={manipularMudancaCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type='submit'>Confirmar</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                props.setExibirTabela(true)
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form> 

                //---------------------------------------------//
                :
                //---------------------------------------------//

                <Form noValidate validated={formValidado} onSubmit={alterar} >
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                id="nome"
                                type="text"
                                name="nome"
                                value={props.clienteAlter.nome}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cpf:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CPF"
                                name="cpf"
                                id="cpf"
                                value={props.clienteAlter.cpf}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Bairro:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bairro"
                                name="bairro"
                                id="bairro"
                                value={props.clienteAlter.bairro}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cidade:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                name="cidade"
                                id="cidade"
                                value={props.clienteAlter.cidade}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Rua:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rua"
                                name="rua"
                                id="rua"
                                value={props.clienteAlter.rua}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Número Endereço:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Número"
                                name="numEnd"
                                id="numEnd"
                                value={props.clienteAlter.numEnd}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cep:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cep"
                                name="cep"
                                id="cep"
                                value={props.clienteAlter.cep}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4" >
                        <Form.Group as={Col} md="6" >
                            <Form.Label>E-mail</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="E-mail"
                                    aria-describedby="inputGroupPrepend"
                                    name="email"
                                    id="email"
                                    value={props.clienteAlter.email}
                                    onChange={manipularAlterCli}
                                />
                                <Form.Control.Feedback type="invalid">
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Telefone"
                                name="tel"
                                id="tel"
                                value={props.clienteAlter.tel}
                                onChange={manipularAlterCli}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type='submit'>Alterar</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                props.setExibirTabela(true)
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            }

        </>
    )
}