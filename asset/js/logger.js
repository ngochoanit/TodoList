 export default (render)=>{
     return (prevState, action,args)=>{
        console.group(action)
        console.log("Prev State: ", prevState);
        console.log("Agruments: ", args);

        const nextState= render(prevState,action,args);
        
        console.log("Prev State: ", nextState);
        console.groupEnd();
        return nextState;

     }
 }