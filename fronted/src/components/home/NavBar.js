import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import AuthService from "../../services/auth.service";
import { MyValidationInput } from '../../common/ValidationComponents.js';

import ImpresorasService from "../../services/impresoras.service.js";


import './NavBar.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, InputGroup, Image, ButtonGroup, ToggleButton, Accordion } from 'react-bootstrap';

function NavigationBar({ query, setQuery, queryUbica, setQueryUbica, currentUser, logOut, theRollActual, setTheRollControl, setCambioRoll, cambioRoll, setTheFiltrarOn, printerType, maxUnities, material, color, setColor, setMaterial, setMaxUnities, setPrinterType, theLocationOn, setLocationOn, theFilLocation, settheFilLocation }) {


  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de roles
  // ##### ##### ##### ##### ##### ##### ##### #####
  const navigate = useNavigate();
  const cambiarRoll = (roll) => {
    // setTheRollControl(roll);
    setTheRollControl(roll);
    setCambioRoll(roll);
    navigate('/');
  }
  const roll = [
    { name: 'Diseñador', value: 'DESIGNER' },
    { name: 'Fabricante', value: 'MANUFACTURER' },
  ];

  const rolesUser = AuthService.getUserRoles();
  console.log(rolesUser);
  const hasRole = (role) => rolesUser.includes(role);


  // const [locationDiseñador, setLocationDiseñador] = useState(JSON.parse(localStorage.getItem("usuarioDescargado")) ? (JSON.parse(localStorage.getItem("usuarioDescargado"))).address : "false");
  // const [locationActual, setLocationActual] = useState(JSON.parse(localStorage.getItem("usuarioDescargado")) ? (JSON.parse(localStorage.getItem("usuarioDescargado"))).address : "false");


  // MANUFACTURER
  // DESIGNER




  // ##### ##### ##### ##pr### ##### ##### ##### #####
  // ##### ##### Control de búsqueda
  // ##### ##### ##### ##### ##### ##### ##### #####
  const [localQuery, setLocalQuery] = useState(query);
  const [localQueryUbica, setLocalQueryUbica] = useState(queryUbica);

  const handleQueryChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleQueryUbicaChange = (event) => {
    setLocalQueryUbica(event.target.value);
  };

  const handleSearchClick = () => {
    setLocationOn(true);
    console.log(theLocationOn);
    navigate("/");
  };

  const handleFilterClick = () => {
    setTheFiltrarOn(true);
    navigate("/");
    // navigate('/');
    // window.location.reload();
    // ImpresorasService.mandarFiltro(printerType, maxUnities, material, color);

  };

  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Return
  // ##### ##### ##### ##### ##### ##### ##### #####
  // setTheRollControl("DESIGNER");
  console.log(theRollActual);
  return (
    <Navbar sticky="top" style={{ backgroundColor: cambioRoll === "DESIGNER" ? "#7D70BA" : cambioRoll === "MANUFACTURER" ? "#332a21" : cambioRoll === "user" ? "#006400" : "primary" }} expand="sm">
      <Container fluid id="flexing">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Logo/AtCliente/Pedidos/Notificaciones/Carrito/Impresoras */}
          <Container ClassName="contenido1" id="contenido1">
            {/* Logo */}
            <Navbar.Brand href="/">
              <Image className="patologo" src={"http://localhost:3000/logo_pato.png"} />
            </Navbar.Brand>
            <Nav className="me-auto">
              {/* Atención al cliente */}
              <Col className="d-flex align-items-center art1">
                <div className="col-1 aling-item-lefth justify-content-between">
                  <Button href="/atencionCliente" variant="light">
                    <img src={"http://localhost:3000/iconos/support_icon.svg"} alt="Pedidos" />
                    <strong>AtCliente</strong>
                  </Button>
                </div>
              </Col>
              {/* Pedidos/Notificaciones */}
              <Col className="d-flex align-items-center art1">
                <div className="col-1 aling-item-lefth justify-content-between">
                  {currentUser && cambioRoll === "DESIGNER" ?
                    <Button href="/pedidos" variant="light" >
                      <img src={"http://localhost:3000/iconos/inventory_2_icon.svg"} alt="Pedidos" />
                      <strong>Pedidos</strong>
                    </Button>
                    : null
                  }
                  {currentUser && cambioRoll === "MANUFACTURER" ?
                    <Button href="/notificaciones" variant="light">
                      <img src={"http://localhost:3000/iconos/bookmark_icon.svg"} alt="Notificaciones" />
                      <strong>Notificaciones</strong>
                    </Button>
                    : null
                  }
                </div>
              </Col>
              {/* Carrito/Impresoras */}
              <Col className="d-flex align-items-center  art1">
                <div className="col-1 aling-item-lefth justify-content-between">
                  {currentUser && cambioRoll === "DESIGNER" ?
                    <Button href="/carritocompra" variant="light">
                      <img src={"http://localhost:3000/iconos/cart_icon.svg"} alt="Carrito" />
                      <strong>Carrito </strong>
                    </Button>
                    : null
                  }
                  {currentUser && cambioRoll === "MANUFACTURER" ?
                    <Button href="/impresorasfabri" variant="light">
                      <img src={"http://localhost:3000/iconos/print_FILL0_icon.svg"} alt="Impresoras" />
                      <strong>Impresoras</strong>
                    </Button>
                    : null
                  }
                </div>
              </Col>
            </Nav>
          </Container>
          {/* Busqueda 1 */}
          <Container ClassName="contenido2" class="busqueda" id="busqueda1">
            <Form inline className="justify-content-center flex-grow-1" id="find">
              {/* <Row className="w-100">
                <InputGroup className="mb-3" size="sm">
                  <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')} />
                  <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
                </InputGroup>
              </Row> */}
              <Row className="w-100">
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ubicación
                    </Accordion.Header>
                    <Accordion.Body style={{ zIndex: 4 }}>
                      <Row>
                        {JSON.parse(localStorage.getItem("usuarioDescargado")) && (
                          <div>
                            <strong>Localización de ususario:</strong>
                            <Button variant="light" id="button-addon2" onClick={() => settheFilLocation((JSON.parse(localStorage.getItem("usuarioDescargado"))).address)}>{JSON.parse(localStorage.getItem("usuarioDescargado")) ? (JSON.parse(localStorage.getItem("usuarioDescargado"))).address : "No hay dirección"}</Button>
                          </div>
                        )}
                      </Row>
                      <Row>

                        {(localStorage.getItem("actualLocation")) && (
                          <div>
                            <strong>Localización actual:</strong>
                            {/* <Button variant="light" id="button-addon2" onClick={() => settheFilLocation(JSON.parse(localStorage.getItem("actualLocation")))}>{JSON.parse(localStorage.getItem("actualLocation")) ? JSON.parse(localStorage.getItem("actualLocation")) : "No hay dirección"}</Button> */}
                            <Button variant="light" id="but ton-addon2" onClick={() => settheFilLocation((localStorage.getItem("actualLocation")))}>{(localStorage.getItem("actualLocation")) ? (localStorage.getItem("actualLocation")) : "No hay dirección"}</Button>
                          </div>
                        )}
                      </Row>
                      <InputGroup className="mb-3" size="sm">
                        <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={theFilLocation} onChange={() => settheFilLocation('')} />
                        <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
                      </InputGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
              {/* <Row className="w-100">
                <InputGroup className="mb-3" size="sm">
                <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')} />
                <Button variant="light" id="button-addon2" onClick={handleSearchClick}> Search </Button>
                </InputGroup>
              </Row> */}
              <p></p>
              <Row className="w-100">
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Filtro
                    </Accordion.Header>
                    <Accordion.Body style={{ zIndex: 4 }}>
                      <Row>
                        <Col md={6}>
                          <Row className="printertype">
                            {/* #################### */}
                            {/* TIPO DE LA IMPRESORA */}
                            {/* #################### */}
                            <div className="form-group">
                              <label htmlFor="printerType">Tipo de impresora</label>
                              <select
                                className="form-control"
                                name="printerType"
                                value={printerType}
                                onChange={e => setPrinterType(e.target.value)}
                              >
                                <option value="">Seleccione el tipo de impresora</option>
                                <option value="FDM">FDM - Deposición de material Fundido</option>
                                <option value="SLA">SLA - Resina (Estereolitografia)</option>
                                <option value="MSLA">MSLA - Máscara de Sombra de Matriz de Pixeles</option>
                                <option value="DLP">DLP - Resina (Procesamiento Digital de Luz)</option>
                                <option value="SLS">SLS - Sintetización Selectiva por laser</option>
                                <option value="MJ">MJ - Inyección de Material</option>
                                <option value="MJF">MJF - Fusión Multijet</option>
                              </select>
                            </div>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row className="maxunities">
                            {/* ######## */}
                            {/* CANTIDAD */}
                            {/* ######## */}
                            <div className="form-group">
                              <label htmlFor="maxUnities">Máximas unidades</label>

                              <input
                                type="number"
                                min="0"
                                value={maxUnities}
                                onChange={e => setMaxUnities(e.target.value)}
                                validations={[]}
                                style={{
                                  width: '100%', // Asegura que el input se adapte al ancho del contenedor
                                  border: '1px solid lightgray', // Define un borde gris claro
                                  borderRadius: '5px', // Redondea los bordes del input
                                  height: '38px', // Ajusta la altura del input
                                }}
                              />
                            </div>
                          </Row>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Row>
                            {/* ########## */}
                            {/* MATERIALES */}
                            {/* ########## */}
                            <div className="form-group">
                              <label htmlFor="material">Materiales</label>
                              <select
                                className="form-control"
                                name="material"
                                value={material}
                                onChange={e => setMaterial(e.target.value)}
                              >
                                <option value="">Seleccione material</option>
                                <option value="PLASTIC">Plástico</option>
                                <option value="RESIN">Resina</option>
                              </select>
                            </div>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row>
                            {/* ##### */}
                            {/* COLOR */}
                            {/* ##### */}
                            <div className="form-group">
                              <label htmlFor="color">Color</label>
                              <select
                                className="form-control"
                                name="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                              >
                                <option value="">Seleccione Color</option>
                                <option value="GREEN">Verde</option>
                                <option value="YELLOW">Amarillo</option>
                                <option value="BLUE">Azul</option>
                                <option value="RED">Rojo</option>
                                <option value="BLACK">Negro</option>
                                <option value="WHITE">Blanco</option>
                                <option value="ORANGE">Naranja</option>
                                <option value="PURPLE">Morado</option>
                                <option value="PINK">Rosa</option>
                                <option value="BROWN">Marron</option>
                              </select>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                      <p>

                      </p>
                      <Row className="justify-content-center">
                        <Button
                          onClick={handleFilterClick}
                          style={{ width: '200px', backgroundColor: 'green', borderColor: 'green' }}
                        >
                          Filtrar
                        </Button>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
            </Form>
          </Container>
          {/* Role/Login */}
          <Container className="contenido3 d-flex">
            {/* Role */}
            {hasRole("MANUFACTURER") && hasRole("DESIGNER") ? (
              <div className="col-8">
                {currentUser ? (
                  <ButtonGroup>
                    {roll.map((roll, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`roll-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-warning' : 'outline-light'}
                        name="roll"
                        value={roll.value}
                        checked={cambioRoll === roll.value}
                        // onChange={(e) => setCambioRoll(e.currentTarget.value)}
                        onChange={(e) => cambiarRoll(e.currentTarget.value)}
                      >
                        {roll.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                ) : null}
              </div>
            ) : null}
            {/* Login/Logout */}
            <div className="col-2">
              {!currentUser ? (
                <Button variant="light" className="btn-outline-diseñador" href="/login ">
                  <img src={"http://localhost:3000/iconos/login_icon.svg"} alt="User Icon" />
                  <strong>Login</strong>
                </Button>
              ) : (
                <Container>
                  <Button variant="light" className="btn-outline-fabricante" href="/" onClick={logOut}>
                    <img src={"http://localhost:3000/iconos/logout_icon.svg"} alt="User Icon" />
                    <strong>LogOut</strong>
                  </Button>
                </Container>
              )}
            </div>
          </Container>
        </Navbar.Collapse>
        {/* Busqueda 2 */}
        <Container ClassName="contenido4" class="busqueda" id="busqueda2">
          <Form inline className="justify-content-center flex-grow-1 find">
            {/* <Row className="w-100">
              <InputGroup className="mb-3" size="sm">
                <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')} />
                <Button variant="light" id="button-addon2" onClick={handleSearchClick}> Search </Button>
              </InputGroup>
            </Row> */}
            <Row className="w-100">
              <Accordion flush className="mb-3" size="sm">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Filtro
                  </Accordion.Header>
                  <Accordion.Body style={{ zIndex: 4 }}>
                    <Row>
                      <Col md={6}>
                        <Row className="printertype">
                          {/* #################### */}
                          {/* TIPO DE LA IMPRESORA */}
                          {/* #################### */}
                          <div className="form-group">
                            <label htmlFor="printerType">Tipo de impresora</label>
                            <select
                              className="form-control"
                              name="printerType"
                              value={printerType}
                              onChange={e => setPrinterType(e.target.value)}
                            >
                              <option value="">Seleccione el tipo de impresora</option>
                              <option value="FDM">FDM - Deposición de material Fundido</option>
                              <option value="SLA">SLA - Resina (Estereolitografia)</option>
                              <option value="MSLA">MSLA - Máscara de Sombra de Matriz de Pixeles</option>
                              <option value="DLP">DLP - Resina (Procesamiento Digital de Luz)</option>
                              <option value="SLS">SLS - Sintetización Selectiva por laser</option>
                              <option value="MJ">MJ - Inyección de Material</option>
                              <option value="MJF">MJF - Fusión Multijet</option>
                            </select>
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="maxunities">
                          {/* ######## */}
                          {/* CANTIDAD */}
                          {/* ######## */}
                          <div className="form-group">
                            <label htmlFor="maxUnities">Máximas unidades</label>

                            <input
                              type="number"
                              min="0"
                              value={maxUnities}
                              onChange={e => setMaxUnities(e.target.value)}
                              validations={[]}
                              style={{
                                width: '100%', // Asegura que el input se adapte al ancho del contenedor
                                border: '1px solid lightgray', // Define un borde gris claro
                                borderRadius: '5px', // Redondea los bordes del input
                                height: '38px', // Ajusta la altura del input
                              }}
                            />
                          </div>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Row>
                          {/* ########## */}
                          {/* MATERIALES */}
                          {/* ########## */}
                          <div className="form-group">
                            <label htmlFor="material">Materiales</label>
                            <select
                              className="form-control"
                              name="material"
                              value={material}
                              onChange={e => setMaterial(e.target.value)}
                            >
                              <option value="">Seleccione material</option>
                              <option value="PLASTIC">Plástico</option>
                              <option value="RESIN">Resina</option>
                            </select>
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row>
                          {/* ##### */}
                          {/* COLOR */}
                          {/* ##### */}
                          <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <select
                              className="form-control"
                              name="color"
                              value={color}
                              onChange={e => setColor(e.target.value)}
                            >
                              <option value="">Seleccione Color</option>
                              <option value="GREEN">Verde</option>
                              <option value="YELLOW">Amarillo</option>
                              <option value="BLUE">Azul</option>
                              <option value="RED">Rojo</option>
                              <option value="BLACK">Negro</option>
                              <option value="WHITE">Blanco</option>
                              <option value="ORANGE">Naranja</option>
                              <option value="PURPLE">Morado</option>
                              <option value="PINK">Rosa</option>
                              <option value="BROWN">Marron</option>
                            </select>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                    <p>

                    </p>
                    <Row className="justify-content-center">
                      <Button
                        onClick={handleFilterClick}
                        style={{ width: '200px', backgroundColor: 'green', borderColor: 'green' }}
                      >
                        Filtrar
                      </Button>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>

            <Row className="w-100">
              {/* <InputGroup className="mb-3" size="sm" style={{ height: "53px" }}>
                <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')} />
                <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
              </InputGroup> */}
              <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ubicación
                    </Accordion.Header>
                    <Accordion.Body style={{ zIndex: 4 }}>
                      <Row>
                        {JSON.parse(localStorage.getItem("usuarioDescargado")) && (
                          <div>
                            <strong>Localización de ususario:</strong>
                            <Button variant="light" id="button-addon2" onClick={() => settheFilLocation((JSON.parse(localStorage.getItem("usuarioDescargado"))).address)}>{JSON.parse(localStorage.getItem("usuarioDescargado")) ? (JSON.parse(localStorage.getItem("usuarioDescargado"))).address : "No hay dirección"}</Button>
                          </div>
                        )}
                      </Row>
                      <Row>

                        {(localStorage.getItem("actualLocation")) && (
                          <div>
                            <strong>Localización actual:</strong>
                            {/* <Button variant="light" id="button-addon2" onClick={() => settheFilLocation(JSON.parse(localStorage.getItem("actualLocation")))}>{JSON.parse(localStorage.getItem("actualLocation")) ? JSON.parse(localStorage.getItem("actualLocation")) : "No hay dirección"}</Button> */}
                            <Button variant="light" id="but ton-addon2" onClick={() => settheFilLocation((localStorage.getItem("actualLocation")))}>{(localStorage.getItem("actualLocation")) ? (localStorage.getItem("actualLocation")) : "No hay dirección"}</Button>
                          </div>
                        )}
                      </Row>
                      <InputGroup className="mb-3" size="sm">
                        <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={theFilLocation} onChange={() => settheFilLocation('')} />
                        <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
                      </InputGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
            </Row>
          </Form>
        </Container>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;