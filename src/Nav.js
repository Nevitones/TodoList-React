import React, { Component } from 'react'

export default class Nav extends Component {
	render() {
		return (
			<nav>
				<ul>
					<li><a href="home">Home</a></li>
					<li><a href="about">About</a></li>
				</ul>
			</nav>
		)
	}
}