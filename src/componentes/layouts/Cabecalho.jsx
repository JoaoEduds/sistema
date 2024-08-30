import { Alert } from "react-bootstrap";

export default function Cabecalho(props){
    //metodo render
    return(
        <Alert className="" variant="light">{props.titulo || "Titulo não fornecido"}</Alert>
    );
}