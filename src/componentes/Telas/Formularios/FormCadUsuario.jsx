import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarPrivilegio } from '../../../servicos/servicoPrivilegio';
import { useSelector,useDispatch } from 'react-redux';
import { incluirUsuario, atualizarUsuario } from '../../../redux/usuarioReducer';
import toast, {Toaster} from 'react-hot-toast';
import ESTADO from '../../../redux/estados';

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [privilegios, setPrivilegios] = useState([]);
    const [temPrivilegios, setTemPrivilegios] = useState(false);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const {estado, mensagem} = useSelector((state)=>state.usuario);
    const despachante = useDispatch();

    useEffect(() => {
        consultarPrivilegio().then((resultado) => {
            if (Array.isArray(resultado)) {
                setPrivilegios(resultado);
                setTemPrivilegios(true);
            } else {
                toast.error("Não foi possível carregar os privilégios");
            }
        }).catch((erro) => {
            setTemPrivilegios(false);
            toast.error("Não foi possível carregar os privilégios");
        });
    }, []); // didMount
    
    function selecionarPrivilegio(evento) {
        setUsuario({ ...usuario, 
                     privilegio: {
                         codigo: evento.currentTarget.value
                     } 
        });
    }
    
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                //cadastrar o produto
                despachante(incluirUsuario(usuario));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    setUsuario({
                        codigo:0,
                        nome:"",
                        senha:"",
                        email:""
                    });
                },5000);
            }
            else {
                despachante(atualizarUsuario(usuario));
                setMensagemExibida(mensagem);
                setTimeout(()=>{
                    setMensagemExibida("");
                    //voltar para o modo de inclusão
                    props.setModoEdicao(false);
                    props.setUsuarioSelecionado({
                        codigo:0,
                        nome:"",
                        senha:"",
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
        setUsuario({...usuario, [elemento]:valor});
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
            <>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>

                <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={usuario.codigo}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do Usuario!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

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

                        <Form.Group as={Col} md={7}>
                                <Form.Label>privilegio:</Form.Label>
                                <Form.Select id='privilegio' 
                                                name='privilegio'
                                                onChange={selecionarPrivilegio}>
                                    {// criar em tempo de execução as privilegios existentes no banco de dados
                                        privilegios.map((privilegio) =>{
                                            return <option value={privilegio.codigo}>
                                                        {privilegio.descricao}
                                                    </option>
                                        })
                                    }
                                    
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={1}>
                                {
                                    !temPrivilegios ? <Spinner className='mt-4' animation="border" variant="success" />
                                    : ""
                                }
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
                                    props.setUsuarioSelecionado({
                                        codigo:0,
                                        nome:"",
                                        senha:"",
                                        email:""
                                    });
                                }
                                props.setExibirTabela(true)
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    mensagemExibida ? <Alert variant='sucess'>{mensagem}</Alert> : ""
                }
            </>
        )
    }
}