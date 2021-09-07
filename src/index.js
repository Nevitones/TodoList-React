import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route} from 'react-router-dom'
import App from './App';
//import App from './AppOld';
import Nav from './Nav';
import About from './About';
import './styles/todo.css'

ReactDOM.render(
	<React.StrictMode>
		<Nav/>
		<Router>
			<Route path="/" exact component={App}/>
			<Route path="/home" exact component={App}/>
			<Route path="/about" component={About}/>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
