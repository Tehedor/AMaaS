import { useState } from 'react';
import './NavBar.css';
import { Navbar, Nav, Form, FormControl, Button, Card, Container, Row, Col, InputGroup, Image, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// function NavigationBar( props) {
// function NavigationBar({ roll, query, setQuery, queryUbica, setQueryUbica, currentUser, logOut }) {
function NavigationBar({ query, setQuery, queryUbica, setQueryUbica, currentUser, logOut }) {
  // currentUser = "arrancar";
  if (JSON.parse(localStorage.getItem("user")) != null) {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } 
  
  const [checked, setChecked] = useState(false);
  const [rollValue, setRollValue] = useState('diseñador');

  const roll = [
    { name: 'Diseñador', value: 'diseñador' },
    { name: 'Fabricante', value: 'fabricante' },
  ];

  // if (roll == "ROLE_USER") {
  //   roll = "diseñador";
  // } 
  // if (roll == "ROLE_ADMIN") {
  //   roll = "fabricante";
  // }
  // roll = "diseñador";
  // roll = "fabricante";

  
  const [localQuery, setLocalQuery] = useState(query);
  const [localQueryUbica, setLocalQueryUbica] = useState(queryUbica);

  const handleQueryChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleQueryUbicaChange = (event) => {
    setLocalQueryUbica(event.target.value);
  };

  const handleSearchClick = () => {
    setQuery(localQuery);
    setQueryUbica(localQueryUbica);
  };

  return (

    
    <Navbar sticky="top"  bg={rollValue !== "fabricante" ? "primary" : "secondary"} expand="sm">
      <Container fluid>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* <Nav className="mr-auto"> */}
          <Container ClassName="contenido1">
            <Nav className="me-auto">
                    
              <Navbar.Brand href="/">
                <Image className="logo" src={"http://localhost:3000/logo_pato.png"} style={{width: '120px', height: '120px'}}/>
              </Navbar.Brand>

                <Col className="d-flex align-items-center">
                  <div className="col-1 aling-item-lefth justify-content-between">
                  <Button href="/atencionCliente" style={{backgroundColor: 'gray'}}>
                    <img src={"http://localhost:3000/iconos/support_icon.svg"} alt="Pedidos" />
                    AtCliente
                  </Button>
                </div>
              </Col>
              <Col className="d-flex align-items-center">
                <div className="col-1 aling-item-lefth justify-content-between">
                {currentUser && rollValue === "diseñador" ?
                  <Button href="/pedidos" style={{backgroundColor: 'gray'}}>
                    <img src={"http://localhost:3000/iconos/inventory_2_icon.svg"} alt="Pedidos" />
                    pedidos
                  </Button>
                : null
                }     
                {currentUser && rollValue === "fabricante" ?
                  <Button href="/notificaciones" style={{backgroundColor: 'gray'}}>
                    <img src={"http://localhost:3000/iconos/bookmark_icon.svg"} alt="Notificaciones" />
                    Notificaciones
                  </Button>
                : null
                }     
                </div>
              </Col>
            </Nav>
          </Container>

          {/* <Form inline className="mx-auto  "> */}
          <Container ClassName="contenido2">
            <Form inline className="justify-content-center flex-grow-1">
              <Row className="w-100">
                <InputGroup className="mb-3" size="sm">
                  <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')}/>
                  <Button variant="secondary" id="button-addon2" onClick={handleSearchClick}> Search </Button>
                </InputGroup>
              </Row>
              <Row className="w-100">
                <InputGroup className="mb-3" size="sm">
                  <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')}/>
                  <Button variant="secondary" id="button-addon2" onClick={handleSearchClick}>Search</Button>
                </InputGroup>
              </Row>
            </Form>
          </Container>


          <Container className="contenido3 d-flex justify-content-between">
          {/* <Container ClassName="contenido3"> */}
            <div className="col-1 aling-item-lefth">
            {/* <Container ClassName="contenido3_1 col-1"> */}
              {currentUser && rollValue === "diseñador"   ?
                <Button href="/carritocompra" style={{backgroundColor: 'gray'}}>
                  <img src={"http://localhost:3000/iconos/cart_icon.svg"} alt="Carrito" />
                    Carrito 
                </Button>
                : null
              }
              {currentUser && rollValue === "fabricante"   ?
                  <Button href="/impresorasfabri" style={{backgroundColor: 'gray'}}>
                    <img src={"http://localhost:3000/iconos/print_FILL0_icon.svg"} alt="Impresoras" />
                      Impresoras
                  </Button>
                : null
              }
            {/* </Container> */}
            </div>
              
            <div className="col-9">

              {!currentUser ? (
                <Button variant="dark" className="btn-outline-diseñador" href="/login ">
                  <img src={"http://localhost:3000/iconos/login_icon.svg"} alt="User Icon" />
                  Login
                </Button>
              ) : (
                <Container>
                  <ButtonGroup>
                    {roll.map((roll, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`roll-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-warning' : 'outline-dark'}
                        name="roll"
                        value={roll.value}
                        checked={rollValue === roll.value}
                        onChange={(e) => setRollValue(e.currentTarget.value)}
                      >
                        {roll.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>

                  <Button variant="dark" className="btn-outline-fabricante" href="/" onClick={logOut}> 
                    <img src={"http://localhost:3000/iconos/logout_icon.svg"} alt="User Icon" />
                  </Button>
                </Container>
              )}
            </div>

          </Container>
        </Navbar.Collapse>
        
      </Container>

    </Navbar>
  );
}

export default NavigationBar;