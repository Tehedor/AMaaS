import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

import PedirPedido from "../../home/PedirPedido";

import PedidosService from "../../../services/diseñador/pedidos.service.js";

export default function VerPediros(props) {

    // const pedidos = props.pedidos;

    const pedidos = props.pedidos;


    const confirmarEntrega = () => {
        PedidosService.confirmarEntrga(pedidos.id_pedido)
    }

    const confirmarRevision = () => {
        PedidosService.confirmarRevision(pedidos.id_pedido)
    }

    const ControlEstados = () => {
        if (pedidos.status === "PAY"){
            console.log(pedidos.status);
            return (
                <>
                    <Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" />
                    <p>Esperando respuesta del Fabricante</p>
                </>
            );
            
        }else if(pedidos.status === "CANCELLED"){
            return (
            <>
                <Image src={"http://localhost:3000/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" />
                <p>Pedido Cancelado/Rechazado</p>
            </>
            )
        }else if(pedidos.status === "REVISION"){
            return (
                <>
                    <Image src={"http://localhost:3000/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" />
                    <Button variant="warning" size="sm" onClick={confirmarRevision}>Revisiar Pedido</Button>
                </>
            )

        }else if(pedidos.status === "CREATING"){
            return (
                <>
                    <Image src={"http://localhost:3000/iconos_estados/creando.svg"} className="icon" alt="creando" />
                    <p>Creando Pedido...</p>
                </>
            )
        }else if(pedidos.status === "SEND"){
            return (
                <>
                <Image src={"http://localhost:3000/iconos_estados/enviado.svg"} className="icon" alt="enviado" />
                <Button variant="warning" size="sm" onClick={confirmarEntrega} >Confirmar Entrega</Button>
                <p>Confirme cuando el pedido haya llegado</p>
                </>
            )
        }else if(pedidos.status === "DELIVERED"){
            return (
                <Image src={"http://localhost:3000/iconos_estados/terminado.svg"} className="icon" alt="terminado" />
            )
        }
    }
    
    
       

    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
        {/* <Card border="gray" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Body>
                <Row>
                    <Col sm={9} class="datos_impresora">
                        

                        <Row>id: {pedidos.id}</Row>
                        <Row>Fecha de pedido: {pedidos.orderdate}</Row>
                        <Row>Fecha de fabricación: {pedidos.manufacturerdate}</Row>
                        <Row>Fecha de recogida: {pedidos.pickupdate}</Row>
                        <Row>Número de impresoras: {pedidos.number}</Row>
                        <Row>Estado: {pedidos.status}</Row>
                        <Row>Especificaciones: {pedidos.specs}</Row>

                    
                        {/* <Card.Text>Stock: {pedidos.Nombre_modelo}</Card.Text> */}
                    </Col> 
                    <Col sm={3} class="boton" className="d-flex justify-content-center align-items-center">
                        {ControlEstados()}
                    </Col>
                </Row>
           
            </Card.Body>
        </Card>  

    );
 
}


// Nombre_modelo": "Elegoo Saturn",
//       "Ubicación_imp": "Taller",
//       "Tipo_impresora": "SLA",
//       "Foto_impresora": "https://www.prusa3d.com/content/images/product/default/224.jpg",
//       "Precio_servicio": 0.26,
//       "Unidades_max": 1,
//       "Velo_fabricacion": 60,
//       "Max_ancho": 219,
//       "Max_alto": 120,
//       "Precision": 50,
//       "Colores_disponibles": ["Gris", "Negro"],
//       "Acabados_disponibles": ["Mate"],
//       "Fabricante": "Elegoo"