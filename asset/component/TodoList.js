import html from '../js/core.js';
import TodoItem from './TodoItem.js';
import {connect} from '../js/store.js';

function TodoList({todos,filter, filters}){
    console.log(filters)
    return html`
        <section class="main">
        <input 
            id="toggle-all" 
            class="toggle-all" 
            type="checkbox"
            onchange="dispatch('toglleAll',this.checked)"
            ${todos.every(filters.completed)&& 'checked'}
            >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
        ${todos
            .filter(filters[filter])
             .map((todo,index) => TodoItem({todo,index}))}
           
        </ul>
        </section>
    `
}
export default connect()(TodoList);
