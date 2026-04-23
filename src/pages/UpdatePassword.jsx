import { useState } from "react";
import { supabase } from "../supabase/client";

export default function UpdatePassword(){

 const [password,setPassword]=useState("");
 const [message,setMessage]=useState("");

 const handleUpdate = async(e)=>{
   e.preventDefault();

   const { error } = await supabase.auth.updateUser({
      password: password
   });

   if(!error){
     setMessage("Password updated successfully.");
   }
 };

 return(
  <div style={styles.container}>
   <div style={styles.card}>
    <h2>Set New Password</h2>

    {message && <p>{message}</p>}

    <form onSubmit={handleUpdate}>
      <input
       type="password"
       placeholder="New Password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       style={styles.input}
      />

      <button style={styles.button}>
        Update Password
      </button>
    </form>
   </div>
  </div>
 )
}

const styles={
container:{
display:"flex",
justifyContent:"center",
alignItems:"center",
minHeight:"100vh",
background:"#f0f4f8"
},
card:{
background:"white",
padding:"2rem",
borderRadius:"12px"
},
input:{
width:"100%",
padding:"12px",
margin:"1rem 0"
},
button:{
width:"100%",
padding:"12px",
background:"#6c63ff",
color:"white",
border:"none"
}
}