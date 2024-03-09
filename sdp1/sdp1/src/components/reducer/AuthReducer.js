export default function AuthReducer(state=[null,0],action){
    switch(action.type)
    {
        case "login":
            localStorage.setItem("un",action.data.un)
            localStorage.setItem("role",action.data.role)
            localStorage.setItem("token",action.data.token)
            return [action.data.un,action.data.role]
        case "logout":
            localStorage.removeItem("un")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            return [null,0]
        default:
            return state

    }

}
//action={"type":"login","data":{"un":username,"role":role}}
