import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import ImpresorasLista from './ImpresorasLista';

// Pruebas de la impresora para las vistas
import { printersexample } from '../../constants/printersPruebas.js';
import { printersPruebas } from '../../constants/printersPruebas.js';

import ImpresorasService from "../../services/impresoras.service.js";


export default function Home(props) {

    // Controlador de impresoras para que funcione el Location
    // const setControlPrinters = props.setControlPrinters;


    const [query, setQuery] = useState("");

    // Contenido de la barra de ubicación
    const [queryUbica, setQueryUbica] = useState("");

    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);

    // Estado en el que se alamcenan las impresoras
    const theprinters = props.theprinters;
    const setThePrinters = (a) => {
        props.setThePrinters(a);
    }

    const theratings = props.theratings;
    const setTheRatings = (a) => {
        props.setTheRatings(a);
    }

    const theFabricantes = props.theFabricantes;
    const setTheFabricantes = (a) => {
        props.setTheFabricantes(a);
    }


    // const [theprinters, setThePrinters] = useState([]);
    // const [theratings, setTheRatings] = useState();
    // const [theFabricantes, setTheFabricantes] = useState();

    // ###### ###### ###### ###### ###### ###### ###### ###### ######
    // ###### ###### ###### Geolocalización
    // ###### ###### ###### ###### ###### ###### ###### ###### ######

    // Localizacion usuario
    // https://www.npmjs.com/package/react-geolocated?activeTab=readme
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });



    // ###### ###### ###### ###### ###### ###### ###### ###### ######
    // ###### ###### ###### dowload versioón 2
    // ###### ###### ###### ###### ###### ###### ###### ###### ######

    // Función que = () => {
    // const downloadprinters;
    // // Coordenadas de Madrid para que sean por defecto 
    // const latitude=40.4167;
    // const longitude=-3.70325;  

    // Poner la manerad para solicitar las impresoras en función de la localizaciónSs
    // if(CONFIG.use_server){
    //     try {
    //     // if(isGeolocationEnabled || !queryUbica===""){
    //     //     if (!queryUbica===""){
    //     //     // api que me permita sacar latitud y longitud de la ubicación a partir de la query 
    //     //     }else{
    //     //     latitude=coords.latitude;
    //     //     longitude=coords.longitude;
    //     //     }
    //     // }
    //     // let queryparams =  "?lat=" + latitude + "&lon=" + longitude;
    //     let queryparams =  "";
    //     // const data = await ImpresorasService.(queryparams);
    //     // console.log(JSON.parse(localStorage.getItem("printers")));
    //     const data = ImpresorasService.descargarPrinters();

    //     console.log(data);
    //     } catch (error) {
    //     // setResultados(
    //     //   { "cod": error.cod, "message": cod.message}
    //     // );
    //     }
    // }else{
    //     // downloadprinters=printersexample;
    //     downloadprinters=printersPruebas;
    //     // console.log(printersexample);
    // }descarga las impresoras, en función de la localización en la que se encuentra
    // const download 
    // setThePrinters(downloadprinters);
    // console.log(theprinters);
    // // setControlPrinters(downloadprinters);
    // // console.log(props.controlPrinters);
    // }


    // ###### ###### ###### ###### ###### ###### ###### ###### ######
    // ###### ###### ###### dowload versioón 1
    // ###### ###### ###### ###### ###### ###### ###### ###### ######

    const download = async () => {
        let downloadprinters;
        let dowloadratings;
        let downloadfabricantes;

        try {

            let response;
            if (props.theFiltrarOn === true) {
                response = (await ImpresorasService.descargarPrintersFiltred(props.printerType, props.maxUnities, props.material, props.color)).data;
            } else {
                response = (await ImpresorasService.descargarPrinters()).data;
            }
            
            if(JSON.parse(localStorage.getItem("user"))){

                await ImpresorasService.getDescargarUsuario();
                console.log(JSON.parse(localStorage.getItem("usuarioDescargado")));
            }
            
            console.log(response);
            downloadprinters = response.printers;
            console.log(downloadprinters);
            dowloadratings = response.ratings;
            console.log(dowloadratings);
            setThePrinters(downloadprinters);
            props.setControlPrinters(downloadprinters);
            console.log(theprinters);
            downloadfabricantes = response.users;
            console.log(downloadfabricantes);
            setTheFabricantes(downloadfabricantes);
            props.setControlFabricantes(downloadfabricantes);

            setTheRatings(dowloadratings);
            props.setControlRatings(dowloadratings);

        } catch (error) {
            // setResultados(
            // { "cod": error.cod, "message": cod.message}
            // );
        }
    }


    // Efecto que se ejecuta al cargar la página
    useEffect(() => {
        setLoading(true);
        async function fetchData() {

            await download();

            setLoading(false);
            // setTimeout(()=>{
            //     setLoading(false);
            // },800);      
        }
        fetchData();
    }, [props.theFiltrarOn]);


    return (
        <div>
            <h2 id="catálogo">impresoras</h2>
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" /> :
                <Row>
                    <ImpresorasLista printers={theprinters} ratings={theratings} theFabricantes={theFabricantes} />
                </Row>
            }
        </div>
    );
}














