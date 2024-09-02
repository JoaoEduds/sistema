import Pagina from "./componentes/layouts/Pagina";
import CadCliente from "./componentes/Cadastros/CadCliente";
import CadProduto from "./componentes/Cadastros/CadProduto";
import CadFornecedor from "./componentes/Cadastros/CadFornecedor";

function App() {
  return (
    <div className="App">
      <Pagina>
        <h1>Esta é a pagina de cadastro de produto</h1>
        <CadProduto/>
      </Pagina>
      <Pagina>
        <h1>Esta é a pagina de cadastro de Cliente</h1>
        <CadCliente/>
      </Pagina>
      <Pagina>
        <h1>Esta é a pagina de cadastro de fornecedor</h1>
        <CadFornecedor/>
      </Pagina>
    </div>
  );
}

export default App;
