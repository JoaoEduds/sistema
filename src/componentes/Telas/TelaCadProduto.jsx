import CadProduto from "./Cadastros/CadProduto";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";

export default function TelaCadProduto(props){
    return (
        <div>
            <Pagina>
                <Alert class="alert alert-success" role="alert">
                    <h2>
                        Cadastro de Produto
                    </h2>
                </Alert>
                <CadProduto/>
            </Pagina>
        </div>
    );
}