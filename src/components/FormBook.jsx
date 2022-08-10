import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export function FormBook() {
  const [validated, setValidated] = useState(false);
  let [estados, setEstados] = useState([]);
  let [cidades, setCidades] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const fetchEstados = () => {
    // Por padrão o método fetch é o GET
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => response.json())
      .then(data => {
        console.log('estados', data)
        setEstados(data);
      })
  }

  const fetchCidades = sigla => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`)
      .then(response => response.json())
      .then(data => {
        //data -> array, ou seja, a lista
        // .map -> semelhante ao for 
        setCidades(data.map(city => <option>{city.nome} </option>))
      })

  }

  useEffect(() => {
    console.log('useEffect')
    fetchEstados();
  }, {})

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {console.log('return')}
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Título</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Digite o título da obra"
          //="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Digite o nome do autor da obra"
          //="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Estados</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={e => {
              let sigla = e.target.value;

              fetchCidades(sigla);

            }}>
            <option>Selecione..</option>
            {estados.map(estado => <option value={estado.sigla}>{estado.nome}</option>)}
          </Form.Select>

        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Cidades</Form.Label>
          <Form.Select
            aria-label="Default select example"
          >
            <option>Selecione..</option>
            {cidades}
          </Form.Select>

        </Form.Group>
      </Row>

      <Button type="submit">Submit form</Button>
    </Form >
  );
}