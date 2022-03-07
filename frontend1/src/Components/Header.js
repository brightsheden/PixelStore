import React, { useEffect } from 'react'; 
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav,Container,NavDropdown, Button} from "react-bootstrap";
import {LinkContainer,} from 'react-router-bootstrap'
import { FaCartPlus, FaNewspaper, FaQuestion, FaUser} from 'react-icons/fa'
import { logout } from "../Actions/userAction";
import SearchBox from './searchBox';
import { createSellerFormm } from '../Actions/sellerFormActions';
import { CREATE_SELLER_FORM_RESET } from '../Constants/sellerFormConstants';
import { useHistory } from 'react-router-dom';





function Header() {

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    
   
    const userProfile = useSelector(state => state.userProfileMore)
    const {profiles, loading, error} = userProfile

    const createSelerForm = useSelector(state => state.createSellerForm)
    const {loading:loadingcreate, error: errorcreate, sellers:createdSeller,
        success:successCreate} = createSelerForm


    let history = useHistory()


    useEffect(()=>{
        if(successCreate){
            dispatch({type: CREATE_SELLER_FORM_RESET})
            history.push(`/applyforseller/${createdSeller._id}/pay/`)
        }
      
        
    },[dispatch,history,successCreate])



  
    
    const createForm = ()=>{
        dispatch(createSellerFormm())
    }

    const lg = () => {
       dispatch(logout())
      
         
    }
    return (
        <div>
            <header>
                <Navbar  bg="info" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand > .PLPFACTORY</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                       
                        <Nav className="ml-auto pull-right " >
                        {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item >
                                            Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={`/profile/settings/${profiles?._id}`}  >
                                            <NavDropdown.Item >
                                                
                                                settings
                                                
                                            
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

                                    <LinkContainer to='/admin/blogs'>
                                     <NavDropdown.Item>
                                         Blog Screen
                                     </NavDropdown.Item>
                                 </LinkContainer>

                                    
                                    <LinkContainer to='/admin/profilelist'>
                                        <NavDropdown.Item>
                                            Users Profile
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>

                                    <LinkContainer to='/sellers'>
                                        <NavDropdown.Item>
                                            All Seller Form
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>

                                    <LinkContainer to='/admin/withdrawallist'>
                                        <NavDropdown.Item>
                                           Withdrawal History
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>
                                   
                                </NavDropdown>
                            )}

                            {profiles?.isSeller && (
                                <NavDropdown title='Seller' id='profile'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>

                                    <LinkContainer to='/withdraw/'  >
                                            <NavDropdown.Item >
                                                
                                                Apply for withdrawal
                                                
                                            
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                    <LinkContainer to='/mywithdrawal'>
                                        <NavDropdown.Item>
                                           Withdrawal History
                                        </NavDropdown.Item>
                                    
                                    </LinkContainer>
                              
                                   
                                </NavDropdown>
                            )}
                           

                           {profiles?.isStaff && (
                                <NavDropdown title='STAFF' id='staffmenu'>
                                    <LinkContainer to='/admin/blogs'>
                                     <NavDropdown.Item>
                                         Blog Screen
                                     </NavDropdown.Item>
                                 </LinkContainer>
                                   
                              
                                   
                                </NavDropdown>
                            )}
                           





                           <LinkContainer to='/blogs'>
                                <Nav.Link><FaNewspaper style={{margin: "5"}}/>Blog</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/faq'>
                                <Nav.Link><FaQuestion style={{margin: "5"}}/>Faqs</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/rules'>
                                <Nav.Link><FaCartPlus style={{margin: "5"}}/>Guide for Sellers</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/terms'>
                                <Nav.Link>Privacy and Policy</Nav.Link>
                            </LinkContainer>



                            { userInfo && !profiles?.isSeller && (
                                <Button onClick={e =>createForm()}><FaCartPlus style={{margin: "5"}}/>Apply For Seller Account</Button>
                            ) }


                            

                           

                           
                        </Nav>

                    </Navbar.Collapse>
                    

                    
                    </Container>


                </Navbar>
            </header>
            
            
        </div>
    );
};

export default Header;