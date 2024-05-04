import { useParams, useLocation } from "react-router-dom";
// import Ver from "./Ver";
import PedirPedido from "./PedirPedido";

export default function Location(props) {
	let { printerId } = useParams();
	// let { productId } = useParams();	

	const location = useLocation();

	console.log(props.controlPrinters);
	console.log(props.controlRatings);
	console.log(props.controlFabricantes);
	console.log(props.controlUsuario);

	return (
		<div>
			<PedirPedido printers={props.controlPrinters} printerId={printerId} ratings={props.controlRatings} cambioRoll={props.cambioRoll} controlFabricantes={props.controlFabricantes}/>
		</div>
	);
}