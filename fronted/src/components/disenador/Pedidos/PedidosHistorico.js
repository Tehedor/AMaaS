import { Button , Row, Col, InputGroup, Form, Table, Container} from "react-bootstrap";
import { useEffect, useState } from "react";

import PedidosLista from './PedidosLista';


// Pruebas de la impresora para las vistas
import CONFIG from '../../../config/config.js';
import {pedidosPruebas} from '../../../constants/pedidosPruebas.js';

// Apis
import PedidosService from "../../../services/diseñador/pedidos.service.js";

// Tabla de estados
import TablaEstados from '../../../common/Tabla_estados.js';

// Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado

export default function PedidosHistorico(props) {
   
    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [thePedidos, setThePedidos] = useState();


   // Función que descarga todos los pedidos para comprar
    const download = async () => {
        let downloadPedidos;
            if(CONFIG.use_server){
                try {
                const response = await PedidosService.getPedidosCarrito();
                console.log(response.data);
                downloadPedidos=response.data;
                
                } catch (error) {
                    // setResultados(
                    // { "cod": error.cod, "message": cod.message}
                    // );
                }
            }else{
                // downloadprinters=printersexample;
                downloadPedidos=carritoPruebas;
                // console.log(printersexample);
            }
        setThePedidos(downloadPedidos);
        console.log(thePedidos);
    }


    // Efecto que se ejecuta al cargar la página
    useEffect(() => {
        setLoading(true);
            async function fetchData() {
            await download();
            setTimeout(()=>{
                setLoading(false);
            },800);		
        }
        fetchData();
    }, []);


    return (
        <div>
            <h2 id="AllPedidos">Todos los pedidos</h2> 
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
        
            <Container>
                <Row>

                    <Col sm={2}>
                    {/* // Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado */}             
                        <TablaEstados />
                        <Button id="volver" variant="primary"  href="/">Volver</Button>
                    </Col>
                    <Col sm={10}>
                        <Row>
                        <PedidosLista pedidos={thePedidos} />
                        </Row>  
                    </Col>
                </Row>
            </Container>

            }
        </div>
    );
}














