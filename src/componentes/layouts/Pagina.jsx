import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props){
    return(
        <>
            <Cabecalho titulo="Sistema de controle gerencial"/>
            <Menu/>
            {
                props.children 
            }
        </>
    );
}