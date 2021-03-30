const initState={
    isLoggedIn:false
}
const reducer =(state=initState,action)=>{
    if(action.type==='LOGIN')
    return{isLoggedIn:true}
    if(action.type==='LOGOUT')
    return{isLoggedIn:false}
    return state
}
export default reducer;