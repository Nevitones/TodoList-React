import React, { useState, useRef, useEffect } from 'react'

export default function Todo({ toDo, sharedMethods }) {
	const [editMode, setEditMode]  = useState(false)
	const toDoNameRef = useRef();

	useEffect(() => {
		if (editMode) {
			toDoNameRef.current.focus();
		}
	}, [editMode]);

	function handleCompletedChanged() {
		sharedMethods.toggleToDo(toDo.id)
	}

	function handleEditToDo(e) {
		if (e.charCode !== 13) return;

		sharedMethods.updateToDo({
			...toDo,
			name: toDoNameRef.current.value
		})

		setEditMode(false);
	}

	function handleEscapeEdit(e) {
		if (e.keyCode  !== 27) return;

		setEditMode(false);
	}

	function handleDoubleClickToDo() {
		if (toDo.archived) {
			sharedMethods.archiveToDo(toDo.id, false)
			return;
		}
		setEditMode(true);
	}

	function handleDeleteToDo(e) {
		if (toDo.archived) {
			if (window.confirm('The ToDo cannot be restored after this action. Proceed anyway?')) {
				sharedMethods.removeToDo(toDo.id)
			}
		} else {
			sharedMethods.archiveToDo(toDo.id, true)
		}

		e.stopPropagation();
	}

	return (
		<div onDoubleClick={handleDoubleClickToDo} className={`toDo-item main-padding ${toDo.complete ? 'toDo-complete' : ''} ${toDo.archived ? 'toDo-archived' : ''} ${editMode ? 'toDo-list-form' : ''}`}>
			{
				editMode
				? <input ref={toDoNameRef} onKeyPress={handleEditToDo} onKeyUp={handleEscapeEdit} text="text" defaultValue={toDo.name}/>
				: <>
					<label>
						<input type="checkbox" onChange={handleCompletedChanged} checked={ toDo.complete }/>
						{ toDo.name }
					</label>
					<button onClick={handleDeleteToDo}>X</button>
				</>
			}
		</div>
	)
}
