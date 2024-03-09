import logo from './logo.svg';
import './App.css';
import Reg from './components/Reg'
import Show from './components/Show'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Appbar from './components/Appbar'
import Login from './components/Login'
import Book from './components/Book';
import Error from './components/Error';
import Update from './components/Update';
import Feedback from './components/Feedback';


function App({store}) {
  console.log(localStorage.getItem("role"))  //can use alert instead of console.log
  console.log(store.getState().NavReducer)
  var d={"name":"sai","course":"mswd"}
  function Page(){
      switch(store.getState().NavReducer){
        case "Login":
          return (<div><Login store={store}/></div>)
        case "Registration":
          return (<div><Reg/></div>)
        case "Show":
          if(localStorage.getItem("role")==1)
          return (<div><Show/></div>)
          else
          return (<div><Error/></div>)
        case "Book":
          if(localStorage.getItem("role")==1 ||localStorage.getItem("role")==2||localStorage.getItem("role")==3)
          return (<div><Book/></div>)
          else 
          return (<div><Error/></div>)
        case "Update":
          if(localStorage.getItem("role")==1)
          return (<div><Update/></div>)
          else 
          return (<div><Error/></div>)
        case "Feedback":
          if(localStorage.getItem("role")==1 ||localStorage.getItem("role")==2||localStorage.getItem("role")==3)
          return (<div><Feedback/></div>)
          else 
          return (<div><Error/></div>)

      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        STUDENT AND COUNSELLOR MANAGEMENT SYSTEM 
      </header>
      <div className="App-by">
        <Appbar store={store} />
        <Page />
      </div>
    </div>
  );
}

export default App;
