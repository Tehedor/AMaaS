import "../ColoresDiseno.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function DisenadorLogin(props) {

    return (
        <div>
            <div>
                <h2 >Mis impresoras</h2> 
                
            </div>
            <div>
                <Link to="/"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


