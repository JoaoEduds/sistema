import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarCategoria } from '../../../servicos/servicoCategoria';
import { consultarFornecedor } from '../../../servicos/servicoFornecedor';
import { useSelector,useDispatch } from 'react-redux';
import { incluirProduto, atualizarProduto } from '../../../redux/produtoReducer';
import toast, {Toaster} from 'react-hot-toast';
import ESTADO from '../../../redux/estados';

export default function FormCadProdutos(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [temCategorias, setTemCategorias] = useState(false);
    const [fornecedores, setFornecedores] = useState([]);
    const [temFornecedor, setTemFornecedor] = useState(false);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const {estado, mensagem} = useSelector((state)=>state.produto);
    const despachante = useDispatch();

    //Ao usar Redux, as categorias não serão recuperadas diretamente do backend (camada de serviço) e sim
    //acessando o estado da aplicação particularmenteda fatia categoria (categoriaSlicer)
    //const = {status, mensagem, listaDeCategorias} = useSelector((state)=>{state.categoria})
    //recuperar de um unico ponto central, as informções, dados, registros da aplicação 
    useEffect(()=>{
    consultarCategoria().then((resultado)=>{
        if (Array.isArray(resultado)){
            setCategorias(resultado);
            setTemCategorias(true);
        }
        else{
            toast.error("Não foi possível carregar as categorias");
        }
    }).catch((erro)=>{
        setTemCategorias(false);
        toast.error("Não foi possível carregar as categorias");
    });
    },[]); //didMount

    useEffect(()=>{
        consultarFornecedor().then((resultado)=>{
            if (Array.isArray(resultado)){
                setFornecedores(resultado);
                setTemFornecedor(true);
            }
            else{
                toast.error("Não foi possível carregar os fornecedores");
            }
        }).catch((erro)=>{
            setTemFornecedor(false);
            toast.error("Não foi possível carregar as categorias");
        });
        },[]);

    function selecionarCategoria(evento){
    setProduto({...produto, 
                    categoria:{
                    codigo: evento.currentTarget.value
                    }});
    }

    function selecionarFornecedor(evento){
        setProduto({...produto,
                    fornecedor:{
                        codigo: evento.currentTarget.value
                    }
        });
    }

    function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
        if (!props.modoEdicao) {
            //cadastrar o produto
            despachante(incluirProduto(produto));
            setMensagemExibida(mensagem);
            setTimeout(()=>{
                setMensagemExibida("");
                setProduto({
                    codigo: 0,
                    descricao: "",
                    precoCusto: 0,
                    precoVenda: 0,
                    qtdEstoque: 0,
                    urlImagem: "",
                    dataValidade: ""
                });
            },5000);
        }
        else {
            despachante(atualizarProduto(produto));
            setMensagemExibida(mensagem);
            setTimeout(()=>{
                setMensagemExibida("");
                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setProdutoSelecionado({
                    codigo: 0,
                    descricao: "",
                    precoCusto: 0,
                    precoVenda: 0,
                    qtdEstoque: 0,
                    urlImagem: "",
                    dataValidade: ""
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
    setProduto({ ...produto, [elemento]: valor });
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
                                value={produto.codigo}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
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
                                value={produto.descricao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Preço de Custo:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="precoCusto"
                                    name="precoCusto"
                                    aria-describedby="precoCusto"
                                    value={produto.precoCusto}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço de custo!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Preço de Venda:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="precoVenda"
                                    name="precoVenda"
                                    aria-describedby="precoVenda"
                                    value={produto.precoVenda}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço de venda!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Qtd em estoque:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="qtdEstoque"
                                    name="qtdEstoque"
                                    aria-describedby="qtdEstoque"
                                    value={produto.qtdEstoque}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a quantidade em estoque!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Url da imagem:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="urlImagem"
                                name="urlImagem"
                                value={produto.urlImagem}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Válido até:</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                id="dataValidade"
                                name="dataValidade"
                                //value={props.modoEdicao ? produto.dataValidade.substr(0,10) : " "}
                                onChange={(evento)=>{
                                    const data = new Date(evento.target.value);
                                    setProduto({...produto, dataValidade: data.toLocaleDateString('pt-br')});
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={7}>
                            <Form.Label>Categoria:</Form.Label>
                            <Form.Select id='categoria' 
                                            name='categoria'
                                            onChange={selecionarCategoria}>
                                {// criar em tempo de execução as categorias existentes no banco de dados
                                    categorias.map((categoria) =>{
                                        return <option value={categoria.codigo}>
                                                    {categoria.descricao}
                                                </option>
                                    })
                                }
                                
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={1}>
                            {
                                !temCategorias ? <Spinner className='mt-4' animation="border" variant="success" />
                                : ""
                            }
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={7}>
                            <Form.Label>Fornecedor:</Form.Label>
                            <Form.Select id='fornecedor' 
                                name='fornecedor'
                                onChange={selecionarFornecedor}>
                                {// criar em tempo de execução as fornecedor existentes no banco de dados
                                    fornecedores.map((fornecedor) =>{
                                        return <option value={fornecedor.codigo}>
                                                    {fornecedor.nome}
                                                </option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={1}>
                            {
                                !temFornecedor ? <Spinner className='mt-4' animation="border" variant="success" />
                                : ""
                            }
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit" disabled={!temCategorias}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                if(props.setModoEdicao){
                                    props.setModoEdicao(false);
                                    props.setProdutoSelecionado({
                                        codigo: 0,
                                        descricao: "",
                                        precoCusto: 0,
                                        precoVenda: 0,
                                        qtdEstoque: 0,
                                        urlImagem: "",
                                        dataValidade: ""
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