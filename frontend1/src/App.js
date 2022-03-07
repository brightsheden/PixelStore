import React from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Switch,} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import {Container} from 'react-bootstrap'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Profilescreen from './Screens/ProfileScreen';
import TemplateScreen from './Screens/TemplateScreen';
import HomeScreen from './Screens/HomeScreen';
import StepTwoRegisterScreen from './Screens/StepTwoRegisterScreen';
import TemplateEditScreen from './Screens/templateEditScreen';
import PaymentsScreen from './Screens/PaymentsScreen';
import PurchasedTemplateScreen from './Screens/PurchasedTemplateScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import TemplateListScreen from './Screens/TemplateListScreen';
import ProfileListScreen from './Screens/ProfileListScreen';
import ProfilesEditScreen from './Screens/ProfilesEditScreen';
import UserProfileSettings from './Screens/UserProfileSettings';
import WithdarawalListScreen from './Screens/WithdrawalListScreen';
import WithdrawalEditScreen from './Screens/WithdrawalEditScreen';
import CreateWithdrawalScreen from './Screens/CreateWithdrawalScreen';
import MyWithdarawalListScreen from './Screens/MyWithdrawalListScreen';
import BlogListScreen from './Screens/BlogListScreen';
import BlogDetailsScreen from './Screens/BlogDetailScreen';
import BlogScreeen from './Screens/BlogScreen';
import BlogEditScreen from './Screens/BlogEditScreen';
import ApplyForSellerScreen from './Screens/ApplyForSeller';
import SellerScreen from './Screens/SellerScreen';
import RulesAndRegScreen from './Screens/RulesAndRegScreen';
import TermsAndConditionScreen from './Screens/TermsAndConditionScreen';
import FaqScreen from './Screens/FaqScreen';
import AboutUsScreen from './Screens/AboutUsScreen';


function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3">
      <Container>
        <Route path="/" component={HomeScreen} exact/>
        <Route path='/template/:id' component={TemplateScreen} />
        <Route path='/admin/template/:id/edit' component={TemplateEditScreen} />
        
        <Route path="/login" component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen} exact/>
        <Route path='/register/two' component={StepTwoRegisterScreen} />
        <Route path='/admin/userlist/' component={UserListScreen} />
        <Route path='/admin/profilelist/' component={ProfileListScreen} />
        <Route path='/admin/withdrawallist/' component={WithdarawalListScreen} />
        <Route path='/profile' component={Profilescreen} exact/>
        <Route path='/withdraw/' component={CreateWithdrawalScreen} />
        <Route path='/profile/settings/:id/' component={UserProfileSettings}/>
        <Route path='/payment/:id/' component={PaymentsScreen}  exact/>
        <Route path='/download/:id/' component={PurchasedTemplateScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/admin/profile/:id/edit' component={ProfilesEditScreen} />
        <Route path='/admin/withdraw/:id/edit' component={WithdrawalEditScreen} />
        <Route path='/admin/templatelist/' component={TemplateListScreen} />
        <Route path='/mywithdrawal/' component={MyWithdarawalListScreen} />
        <Route path='/blogs' component={BlogListScreen} exact/>
        <Route path='/blog/:id/' component={BlogDetailsScreen}/>
        <Route path='/admin/blogs' component={BlogScreeen} />
        <Route path='/admin/blog/:id/edit/' component={BlogEditScreen} />
        <Route path='/applyforseller/:id/pay/' component={ApplyForSellerScreen} />
        <Route path='/sellers/' component={SellerScreen} />
        <Route path='/terms/' component={TermsAndConditionScreen} />
        <Route path='/rules' component={RulesAndRegScreen} exact/>
        <Route path='/faq' component={FaqScreen} exact/>
        <Route path='/aboutus' component={AboutUsScreen} exact/>
        


      </Container>

    </main>
    <Footer/>
  </Router>
  );
}

export default App;
