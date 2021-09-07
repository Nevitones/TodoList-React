import React, { Component } from 'react'
import ToDoList from './ToDoList'

class App extends Component {

	constructor(props) {
		super(props)
		this.LOCAL_STORAGE_KEY = 'ToDoAppKey';

		const storedToDos = localStorage.getItem(this.LOCAL_STORAGE_KEY) || []

		this.state = {
			toDos: JSON.parse(storedToDos)
		}

		this.setToDos = updatedToDosCallback => {
			this.setState(prevState => {
				return { 
					toDos: updatedToDosCallback(prevState.toDos)
				}
			})
		}

		this.toDoNameRef = React.createRef('toDoNameRef');
	}

	componentDidMount() {
		console.log('componentDidMount');
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.state.toDos))
	}

	handleAddToDo(e) {
		if (e.charCode === 13) {
			const name = this.toDoNameRef.current.value
			if (name === '') return

			this.setState(prevState => {
				const toDos = prevState.toDos
				return {
					toDos: [
						...toDos,
						{
							id: toDos.length + 1,
							name: name,
							complete: false
						}
					]
				}
			})

			this.toDoNameRef.current.value = null
		}
	}

	toggleToDo(id) {
		this.setState(prevState => {
			const newToDos = [...prevState.toDos]
			const toDoIdx = newToDos.findIndex(toDo => toDo.id === id)
			const toDo = {...newToDos[toDoIdx]}
			toDo.complete = !toDo.complete
			
			newToDos[toDoIdx] = toDo

			return {
				toDos: newToDos
			}
		})
	}

	removeToDo(id) {
		this.setState(prevState => {
			return {
				toDos: prevState.toDos.filter(toDo => toDo.id !== id)
			}
		})
	}

	handleClearComplete(e) {
		this.setState(prevState => {
			return {
				toDos: prevState.toDos.filter(toDo => !toDo.complete)
			}
		})
	}

	render() {
		return (
			<>
				<h1 className="main-padding">{this.props.welcomeMessage}</h1>
				<div className="toDo-item toDo-list-form main-padding">
					<input ref={this.toDoNameRef} onKeyPress={this.handleAddToDo.bind(this)} text="text" placeholder="Type the task and hit enter..."/>
				</div>
				<ToDoList toDos={ this.state.toDos } toggleToDo={this.toggleToDo.bind(this)} removeToDo={this.removeToDo.bind(this)}/>
				<div className="toDo-status main-padding">
					<span>{this.state.toDos.filter(toDo => !toDo.complete).length} left to do</span>
					<button onClick={this.handleClearComplete.bind(this)}>Clear done</button>
				</div>
			</>
		)
	}
}

App.defaultProps = {
	welcomeMessage: 'Let\'s fix your tasks mess!'
}

export default App;
