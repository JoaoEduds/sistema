import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Menu(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Fornecedores</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Produtos</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Categoria</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Operação" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Relatorio" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Fornecedores</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Produtos</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Categoria</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home">Sobre</Nav.Link>
                        <Nav.Link href="#home">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}