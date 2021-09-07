import { useState, useRef, useEffect } from 'react'
import ToDoList from './ToDoList'
function App(props) {
	const [toDos, setToDos]  = useState([])
	const [filters, setFilters]  = useState({
		showToDo: true,
		showDone: true,
		showArchived: false
	})
	const toDoNameRef = useRef();
	const LOCAL_STORAGE_KEY = 'ToDoAppKey';

	useEffect(() => {
		const storedToDos = localStorage.getItem(LOCAL_STORAGE_KEY)
		setToDos(JSON.parse(storedToDos))
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDos))
	}, [toDos]);

	function handleAddToDo(e) {
		if (e.charCode !== 13) return

		const name = toDoNameRef.current.value
		if (name === '') return

		addToDo({
			name: name,
			complete: false,
			archived: false
		})

		// setToDos(previousToDos => {
		// 	return [...previousToDos, {
		// 		id: Date.now(),
		// 		name: name,
		// 		complete: false,
		// 		archived: false
		// 	}]
		// })

		toDoNameRef.current.value = null;
	}

	function addToDo(newToDo) {
		if (!newToDo.id) {
			newToDo = {
				id: Date.now(),
				...newToDo
			}
		}

		setToDos(previousToDos => {
			return [...previousToDos, newToDo]
		})
	}

	function updateToDo(newToDo) {
		const newToDos = [...toDos];
		const toDoIdx = newToDos.findIndex(toDo => toDo.id === newToDo.id)
		newToDos[toDoIdx] = newToDo;
		setToDos(newToDos);
	}

	function toggleToDo(id) {
		const newToDos = [...toDos];
		const toDo = newToDos.find(toDo => toDo.id === id)
		toDo.complete = !toDo.complete;
		setToDos(newToDos);
	}

	function archiveToDo(id, archive) {
		const newToDos = [...toDos];
		const toDo = newToDos.find(toDo => toDo.id === id)
		toDo.archived = archive;
		setToDos(newToDos);
	}

	function removeToDo(id) {
		setToDos(toDos.filter(toDo => toDo.id !== id));
	}

	function handleArchiveComplete() {
		const newToDos = [...toDos];
		newToDos.forEach(toDo => {
			if (toDo.complete) {
				toDo.archived = true;
			}
		})
		setToDos(newToDos);
	}

	function handleShowToDo() {
		const newFilters = {...filters}
		newFilters.showToDo = !newFilters.showToDo
		setFilters(newFilters)
	}

	function handleShowDone() {
		const newFilters = {...filters}
		newFilters.showDone = !newFilters.showDone
		setFilters(newFilters)
	}

	function handleShowArchived() {
		const newFilters = {...filters}
		newFilters.showArchived = !newFilters.showArchived
		setFilters(newFilters)
	}

	function filteredToDos() {
		return toDos.filter(toDo => {
			if (!filters.showArchived && toDo.archived) return false

			return (filters.showToDo && !toDo.complete) ||
					(filters.showDone && toDo.complete) ||
					(filters.showArchived && toDo.archived)
		});
	}

	const sharedMethods = {
		updateToDo,
		toggleToDo,
		removeToDo,
		archiveToDo
	}

	return (
		<>
			<h1 className="main-padding">{props.welcomeMessage}</h1>
			<div className="toDo-item toDo-list-form main-padding">
				<input ref={toDoNameRef} onKeyPress={handleAddToDo} text="text" placeholder="Type the task and hit enter..."/>
			</div>
			<ToDoList toDos={ filteredToDos() } sharedMethods={sharedMethods}/>
			<div className="toDo-status main-padding">
				<span>{filteredToDos().filter(toDo => !toDo.complete).length} left to do</span>
				<button onClick={handleShowToDo} className={filters.showToDo ? 'filter-on' : ''}>to do</button>
				<button onClick={handleShowDone} className={filters.showDone ? 'filter-on' : ''}>done</button>
				<button onClick={handleShowArchived} className={filters.showArchived ? 'filter-on' : ''}>archived</button>
				<button onClick={handleArchiveComplete}>Archive done</button>
			</div>
		</>
	)
}

App.defaultProps = {
	welcomeMessage: '...one more To-Do list'
}

export default App;
