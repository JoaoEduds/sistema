import CadCategoria from "./Cadastros/CadCategoria";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";

export default function TelaCadCategoria(props){
    return (
        <div>
            <Pagina>
                <Alert class="alert alert-success" role="alert">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                <CadCategoria/>
            </Pagina>
        </div>
    );
}