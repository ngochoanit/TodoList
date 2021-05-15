export default function html([first, ...strings], ...values){
    return  values.reduce(
        (acc,cur)=>acc.concat(cur,strings.shift()),
    [first]
    ).filter((x)=> x && x !== true || x===0 )
    .join('')
}

export function createStore(reducer){
    let state= reducer();
    const roots= new Map();

    // component() trả về string html đã đc map dữ liệu
    // sau đó root (element gốc ở index.html) đực cập nhật giao diện
    function render(){
        for( const [root, component ] of roots){
            const output= component();
            root.innerHTML= output;
        }
    }

    return {
        // lấy giao diện và thành phần element set cho root để có thể reder
        // sau đó render để cập nhật giao diện
        attach(component,root){
            roots.set(root,component);
            render();
        },
        connect(selector = state => state){
            return component => (props,...args) =>
                component(Object.assign({},props,selector(state),args))
        },
        dispatch(action,...args){
            state= reducer(state,action,args);
            render();
        }
    };
}