import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [formValidade, setFormValidade] = useState(false);
    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o produto
                props.setListaDeFornecedores([...props.listaDeFornecedores, fornecedor]);
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
                props.setListaDeFornecedores(props.listaDeFornecedores.map((item) => {
                    if (item.cnpj !== fornecedor.cnpj)
                        return item
                    else
                        return fornecedor
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                    nome:"",
                    cnpj:"",
                    bairro:"",
                    cidade:"",
                    rua:"",
                    num:"0",
                    cep:"",
                    tel:"",
                    email:""
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
                        <Form.Label>Rua:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Rua"
                            name="rua"
                            value={fornecedor.rua}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>Número Endereço:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Número"
                            name="num"
                            value={fornecedor.num}
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
                            props.setExibirTabela(true)
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}