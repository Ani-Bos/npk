import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import io from "socket.io-client"
import Message from './Message'
import Cookies from 'js-cookie'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import queryString from 'query-string'
let socket;
function Room() {
    let navigate=useNavigate();
    
    
    let location=useLocation();
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT="http://localhost:5000";

    const {name,room,other} =queryString.parse(location.search);
    
    useEffect(() => {
      
        if(!Cookies.get('auth-Tokennpk')){
          navigate('/');
        
        }
        
      
    
 
     if(!room ){
      navigate('/dashboard');
    
     }
     
     socket=io(ENDPOINT);
     
      let nam=name.split(' ')[0].toLowerCase()
      socket.emit('join',{name:nam,room:room},(error)=>{
        console.log(nam,room)
        if(error){
        
          navigate('/dashboard');
        
        }
      });
   return ()=>{
            socket.disconnect()
    }
   
    }, [ENDPOINT,navigate,room]);
  
  
   
    useEffect(() => {
     
    socket.on('message',(message)=>{
        console.log(message)
      setMessages([...messages,message]);
    })
    socket.on('roomData',({users})=>{
      setUsers(users);
    })
    }, [messages]);
    
    
        const handlesend=()=>{
         
            if(message){
              socket.emit('sendMessage',{message},()=>setMessage(''))
            }
        }
    
  return (
    <div className='container m-auto'>
        <div className=" w-[80%] border-2 h-[50%] z-10 m-auto">
            <div className='flex justify-between'>
            <div className='font-bold text-lg py-2 px-1'>
                {
                    other
                }
            </div>
            <div>
            <div className="py-2 px-1">
        <button
          className="font-semibold"
          onClick={() => {
            navigate("/community");
          }}
        >
          <ArrowBackIosNewIcon /> Back{" "}
        </button>
      </div>
            </div>
            </div>
           
    <div className='h-[60vh] bg-yellow-100 overflow-y-scroll'>
      {
        messages.map((message,i)=>{
         return <div key={i}><Message name={name} message={message}/></div>
        })
      }
    </div>
    <div className='flex'>
      <input placeholder='Type message...' value={message} className='w-[100vw] px-3' type="text" name="input" id="input" onChange={(e)=>{
        setMessage(e.target.value);
      }} />
      <button onClick={handlesend} className='btn-primary'>Send</button>
    </div>
   </div>
    </div>

  )
}

export default Room