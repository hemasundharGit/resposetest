export default function NavReducer(state="Login",action){
    switch(action.type){
        case "page":
            state =action.data;
            return state
        default:
            return "Login"
    }
}