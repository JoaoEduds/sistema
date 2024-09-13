import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function CadProduto(props) {
  
  const[formValidado, setFormValidade] = useState(false);

  const [produto, setProduto] = useState({
    codigo:0,
    descricao:"",
    precoCusto:0,
    precoVenda:0,
    qtdEstoque:0,
    urlImage:"",
    dataValidade:""  
  });

  function manipularSubmissao(evento){
    
    const form = evento.currenTarget;
    if(form.checkValidity){
      //cadastrar Produto
      props.listaDeProdutos.push(produto);
      //exibir tabela com produto incluido
      props.setExibirTabela(true)
    }
    else{
      setFormValidade(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  function manipularMudancas(evento){
    const elemento = evento.target.name;
    const valor = evento.target.value;
    setProduto({...produto, [elemento]:valor});
    console.log(`componente ${elemento} : ${valor}`);
  }

  return (
    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="codigo">
          <Form.Label>Codigo</Form.Label>
          <Form.Control
            value={produto.codigo}
            type="text"
            id="codigo"
            placeholder="Codigo"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            id="descricao"
            placeholder="Descrição"
            value={produto.descricao}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} md="4" controlId="validationCustoPrecoCusto">
          <Form.Label>Preço Custo</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
            <Form.Control
              type="text"
              id="precoCusto"
              placeholder="Preço Custo"
              aria-describedby="inputGroupPrepend"
              valor={produto.precoCusto}
            />
            <Form.Control.Feedback type="invalid">Insira o Preço Custo.</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustoPrecoVenda">
          <Form.Label>Preço Venda</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="precoVenda"
              aria-describedby="inputGroupPrepend"
              required={produto.precoVenda}
            />
            <Form.Control.Feedback type="invalid">
              Insira o Preço Venda.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustoQntd">
          <Form.Label>Quantidade</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="qtdEstoque"
              aria-describedby="inputGroupPrepend"
              required={produto.qtdEstoque}
            />
            <Form.Control.Feedback type="invalid">
              Insira a Quantidade.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Url Imagem</Form.Label>
          <Form.Control 
            type="text"  
            placeholder="Url" 
            required={produto.urlImage} 
          />
          <Form.Control.Feedback type="invalid">Insira o Url da imagem.</Form.Control.Feedback>
        </Form.Group>
        </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Row className='mt-2 mb-2'>
        <Col md={1}>
          <Button type='submit'>Confirmar</Button>
        </Col>
        <Col md={{offset: 1}}>
          <Button onClick={()=>{
            props.setExibirTabela(true);
          }}>Voltar</Button>
        </Col>
      </Row>
    </Form>
  );
}