import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import VerNotificacion from "./VerNotificacion";
import ControlPedidos from "../../disenador/Pedidos/ControlPedidos";

export default function NotificacionesLista(props) {



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    let lista = props.pedidos;
    console.log(lista);
    let diseñadores = props.diseñadores;
    console.log(diseñadores);
    let printers = props.printers;

    // console.log("lista",lista);
    // console.log("printers",printers);
    // console.log("diseñador",diseñadores);


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### funcioens de busqueda
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const searchPrinter = (id) => {
        for (let i = 0; i < printers.length; i++) {
            console.log(printers[i].id);
            if (printers[i].id == id) {
                console.log(printers[i]);
                return printers[i];
            }
        }
    }

    const searchDiseñador = (id) => {
        for (let i = 0; i < diseñadores.length; i++) {
            if (diseñadores[i].id == id) {
                console.log(diseñadores[i]);
                return diseñadores[i];
            }
        }

    }


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####  
    return (
        <div id="productosresultados" >
            {Array.isArray(lista) && lista.length > 0 && [...lista].reverse().map((items, index) => (
                items.status !== "KART" &&
                <VerNotificacion pedidos={items} printer={searchPrinter(items.printer_id)} diseñador={searchDiseñador(items.designer_id)} />
            ))}
        </div>
    );
}
