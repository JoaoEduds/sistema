import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function CadCategoria(props) {
  
  const [formValidado, setFormValidado] = useState(false);
  const [categoria, setCategoria] = useState(props.categoriaSelecionada);

  function manipularSubmissao(evento){
    const form = evento.currentTarget;
    if (form.checkValidity()){
        if(!props.modoEdicao){
            props.setListaDeCategorias([...props.listaDeCategorias, categoria]);
            props.setExibirTabela(true);
        }
        else{
            props.setListaDeCategorias(props.listaDeCategorias.map((item)=>{
                if(item.codigo !== categoria.codigo)
                    return item;
                else
                    return categoria;
            }));
            props.setModoEdicao(false);
            props.setCategoriaSelecionada({
                codigo:0,
                descricao:"",
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
      setCategoria({...categoria, [elemento]:valor});
  }

  return (
    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Codigo</Form.Label>
            <Form.Control
              required
              type="text"
              id="codigo"
              name="codigo"
              value={categoria.codigo}
              disabled={props.modoEdicao}
              onChange={manipularMudanca}
            />
          <Form.Control.Feedback type="invalid">Por favor, informe o codigodo produto!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
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
          <Form.Control.Feedback type="invalid">Por favor, informe a categoria produto!</Form.Control.Feedback>
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