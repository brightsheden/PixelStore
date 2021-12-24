import React from 'react'; 
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav,Container,NavDropdown} from "react-bootstrap";
import {LinkContainer,} from 'react-router-bootstrap'
import { FaUser} from 'react-icons/fa'
import { logout } from "../Actions/userAction";





function Header() {

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    

    const lg = () => {
       dispatch(logout())
       console.log("logout")
         
    }
    return (
        <div>
            <header>
                <Navbar  bg="info" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand>PixelStore</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item >
                                            Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={lg}>Logout</NavDropdown.Item>

                                    </NavDropdown> 
                                ): <LinkContainer to='/login'>
                                <Nav.Link><FaUser style={{margin: "5"}}/>Login</Nav.Link>
                            </LinkContainer>}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>
                                    <LinkContainer to='/admin/templatelist'>
                                        <NavDropdown.Item>
                                            Template
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>
                                   
                                </NavDropdown>
                            )}
                           





                           

                           
                        </Nav>

                    </Navbar.Collapse>

                    
                    </Container>


                </Navbar>
            </header>
            
        </div>
    );
};

export default Header;