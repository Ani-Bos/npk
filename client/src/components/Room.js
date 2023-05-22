import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import io from "socket.io-client"
import Message from './Message'
import Cookies from 'js-cookie'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import queryString from 'query-string'
import axios from 'axios'
let socket;
function Room({host}) {
    let navigate=useNavigate();
    
    
    let location=useLocation();
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT=host;

    const {name,room,other} =queryString.parse(location.search);
    const getchat=async()=>{
        const chatall = await axios.get(`${host}/api/chat/getallchat/${room}`);
        const data=chatall?.data;
        setMessages(data?.allchat?.chat)
        // console.log(data)
    }
    useEffect(() => {
     getchat();
    }, [])
    
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
    
    
        const handlesend=async()=>{
         
            if(message){
              socket.emit('sendMessage',{message},()=>setMessage(''))
              const resp=await axios.put(`${host}/api/chat/updatechat`,{room:room,message:{text:message,user:name.toLowerCase()}});
              const data=resp.data;
              console.log(data);
            }
           

        }
    
  return (
    <div className="container m-auto">
      <div className=" w-[80%] border-2 h-[50%] z-10 m-auto">
        <div className="flex justify-between">
          <div className="font-bold text-lg py-2 px-1">{other}</div>
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

        <div
          className="h-[60vh] overflow-y-scroll"
          style={{
            background: `url('Images/xxxxxx.png')`,
            backgroundSize: "contain",
          }}
        >
          {messages.map((message, i) => {
            return (
              <div key={i}>
                <Message name={name} message={message} />
              </div>
            );
          })}
        </div>
        <div className="flex">
          <input
            placeholder="Type message..."
            value={message}
            className="w-[100vw] px-3"
            type="text"
            name="input"
            id="input"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={handlesend} className="btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room