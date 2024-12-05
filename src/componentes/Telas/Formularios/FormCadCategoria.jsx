import { Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { incluirCategoria, atualizarCategoria } from '../../../redux/categoriaReducer';
import toast, {Toaster} from 'react-hot-toast';
import ESTADO from '../../../redux/estados';

export default function FormCadCategorias(props) {
    const [categoria, setCategoria] = useState(props.categoriaSelecionada);
    const [formValidado, setFormValidado] = useState(false);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const {estado, mensagem} = useSelector((state)=>state.produto);
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirCategoria(categoria));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    setCategoria({
                        codigo: 0,
                        descricao: ""
                    });
                },5000);
            }
            else {
                despachante(atualizarCategoria(categoria));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    props.setModoEdicao(false);
                    props.setCategoriaSelecionada({
                        codigo: 0,
                        descricao: ""
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
        setCategoria({ ...categoria, [elemento]: valor });
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
                                value={categoria.codigo}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={categoria.descricao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a descrição da categoria!</Form.Control.Feedback>
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
                                    props.setCategoriaSelecionada({
                                        codigo: 0,
                                        descricao: ""
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
        );
    }
}