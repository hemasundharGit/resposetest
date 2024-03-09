import axios from "axios";


export default function update(){
    function handleUpdate(){
        axios.put('http://localhost:8081/update',{
            
                name:document.getElementById('idname').value,
                pw:document.getElementById('idpw').value,
                email:document.getElementsByName('email')[0].value,
                role:document.getElementById('idrole').value

        }).then((res)=>{
            console.log(res.data)
        })
    }
    return(
        <div className="update-parent">
            <center>
            <div id="lp" className="update-page" style={{boxShadow: "5px 5px 7px black"}}>
            <p><b><i style={{textShadow: "1px 2px 5px yellow, -1px -2px 3px white"}}>Update Page</i></b></p>
            <input type="text" id="idname" name="name" placeholder="name"/><br/><br/>
            <input type="password" id="idpw" name="pw" placeholder="password"/><br/><br/>
            <input type="text" id="idemail" name="email" placeholder="email"/><br/><br/>
            <input type="text" id="idrole" name="role" placeholder="role"/><br/><br/>
            <button onClick={handleUpdate}>update</button>
            </div>
            </center>
            </div>
    )

}