import { useState } from "react";
import { supabase } from "../supabase/client";

export default function ForgotPassword() {

 const [email,setEmail] = useState("");
 const [message,setMessage] = useState("");
 const [error,setError] = useState("");

 const handleReset = async (e)=>{
   e.preventDefault();

   const { error } =
   await supabase.auth.resetPasswordForEmail(email,{
      redirectTo:"http://localhost:5173/update-password"
   });

   if(error){
     setError(error.message);
   } else {
     setMessage("Password reset link sent to your email.");
   }
 };

 return (
  <div style={styles.container}>
   <div style={styles.card}>
    <h2 style={styles.title}>Reset Password</h2>

    <p style={styles.subtitle}>
      Enter your email to receive a reset link
    </p>

    {error && <p style={styles.error}>{error}</p>}
    {message && <p style={styles.success}>{message}</p>}

    <form onSubmit={handleReset}>
      <input
       style={styles.input}
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       required
      />

      <button style={styles.button} type="submit">
        Send Reset Link
      </button>
    </form>

   </div>
  </div>
 )
}

const styles = {
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
   borderRadius:"12px",
   width:"100%",
   maxWidth:"400px",
   boxShadow:"0 4px 20px rgba(0,0,0,.1)"
 },

 title:{
   textAlign:"center"
 },

 subtitle:{
   textAlign:"center",
   color:"#666"
 },

 input:{
   width:"100%",
   padding:"0.75rem",
   margin:"1rem 0",
   border:"1px solid #ddd",
   borderRadius:"8px",
   boxSizing:"border-box"
 },

 button:{
   width:"100%",
   padding:"0.75rem",
   background:"#6c63ff",
   color:"white",
   border:"none",
   borderRadius:"8px"
 },

 error:{color:"red"},
 success:{color:"green",
     textAlign:"center"
    
 }
}