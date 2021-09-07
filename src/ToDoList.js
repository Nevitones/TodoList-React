import ToDo from './ToDo'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
export default function TodoList({ toDos, toggleToDo, removeToDo, archiveToDo, sharedMethods }) {
	return (
		<div>
			<TransitionGroup >
				{
					toDos.map(toDo => (
						<CSSTransition
							key={toDo.id}
							classNames="toDo"
							timeout={{ enter: 250, exit: 250 }}
						>
							<ToDo key={toDo.id} toDo={toDo} sharedMethods={sharedMethods}/>
						</CSSTransition>
					))
				}
			</TransitionGroup>
		</div>

	)
}