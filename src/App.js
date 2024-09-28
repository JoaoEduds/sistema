import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina from "./componentes/layouts/Pagina";
import Tela404 from "./componentes/Telas/Tela404";
import TelaCadProduto from "./componentes/Telas/TelaCadProduto";
import TelaMenu from "./componentes/Telas/TelaMenu";
import TelaCadCategoria from "./componentes/Telas/TelaCadCategoria";
import TelaCadEntregador from "./componentes/Telas/TelaCadEntregador";
import TelaCadCli from "./componentes/Telas/TelaCadCli";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import TelaCadastroFornecedor from "./componentes/Telas/TelaCadastroFornecedor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {
        //a ordem das rotas é importante
      }
        <Routes>  
          <Route path="/produto" element={<TelaCadProduto/>}/>
          <Route path="/categoria" element={<TelaCadCategoria/>}/>
          <Route path="/entregador" element={<TelaCadEntregador/>}/>
          <Route path="/cliente" element={<TelaCadCli />} />
					<Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
					<Route path="/usuario" element={<TelaCadastroUsuario />} />
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
