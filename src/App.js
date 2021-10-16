import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Constants from './utility/Constants';
import './App.css';

import Home from './pages/Home';
import Post from './pages/Post';
import Header from './components/Header';

class App extends React.Component {
	componentDidMount() {
		document.title = Constants.TITLE;
	}

	/**
     * Returns a default template with the current content based on the URL routed page.
     * If page is not found, it redirects to the home page.
	 * 
	 * @returns {HTMLAllCollection} Collection of HTML components that are displayed at this route
	 */
	render() {
		return (
			<Router>
				<div
					className = "workable-space"
				>
					<Header/>
					<Switch>
						<Route exact path = "/" component = {Home}/>
						<Route path = "/post" component = {Post}/>
						<Route component= {Home} />
					</Switch>
				</div>
			</Router>
		);
	}
}


export default App;
