import axios from "axios";
import { useState } from "react";

function Show(){
    const[r,setR]=useState(null)
    if(r==null){
    axios.get('http://localhost:8081/show',{
        headers:{
            "authorization":`Bearer ${localStorage.getItem("token")}`,
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        console.log(res.data)
        setR(res.data)
    })
    }
function handleDelete(event){
    alert(event.currentTarget.getAttribute("user"))
    axios.delete('http://localhost:8081/delete',{params:{
        "name":event.currentTarget.getAttribute("user")
     }}).then((res)=>{
        console.log(res.data)
     })
}
    if(r!=null){
    return(<center>
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delete</th>
            </tr>
         {r.map((user)=>{
            return(
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td><button user={user.name} onClick={handleDelete}>delete</button></td>

                    </tr>
            )
         })}   
        </table>
        </center>
    );}
    else {
        return(<div>
            data fetching
        </div>
        )
    }
}
export default Show