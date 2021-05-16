import storage from '../util/storage.js'
const init={
    todos:storage.get(),
    filter:"all",
    filters:{
        all:()=> true,
        active:todo=>!todo.completed,
        completed: todo=>todo.completed
    },
    editIndex:null
    // todos:[
    //     {
            
    //         title: "Learn Html&CSS",
    //         completed:true,
    //     },
    //     {
    //         title: "Learn Javascript",
    //         completed:false
    //     },
    //     {
    //         title: "Learn Git",
    //         completed:false
    //     },
    //     {
    //         title: "Learn NodeJS",
    //         completed:false
    //     },
    // ]
};

const actions={
    add({todos},title){
        if(title)
        {
            todos.push({title,completed:false});
            storage.set(todos)
        }   
    },
    toggle({todos},index){
        const todo=todos[index];
        todo.completed=!todo.completed;
        storage.set(todos);
    },
    toglleAll({todos},completed){
        todos.forEach(todo=> todo.completed=completed);
        storage.set(todos);
    },
    destroy({todos},index){
        todos.splice(index,1);
        storage.set(todos);
    },
    switchFilter(state,filter){
        state.filter=filter;
        
    },
    clearCompleted(state){
        state.todos=state.todos.filter(state.filters.active)
        storage.set(state.todos);
    },
    startEdit(state,index){
        state.editIndex=index;
    },
    endEdit(state,title){
        if(state.editIndex !== null)
        {
            if(title)
            {
                state.todos[state.editIndex].title= title;
                storage.set(state.todos)
            }
            else{
                this.destroy(state,state.editIndex);
            }
            state.editIndex=null;
        }
       
    },
    canceEdit(state){
        state.editIndex=null
    }
}
export default function reducer(state= init, action, agrs){
    actions[action] && actions[action](state,...agrs);

    return state;
}
