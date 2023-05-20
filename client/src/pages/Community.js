import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Cookies from 'js-cookie'
import Avatar from 'react-avatar'
import {useNavigate} from 'react-router-dom'
import { div } from '@tensorflow/tfjs'
function Community({host}) {
  let navigate=useNavigate()
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [phone, setPhone] = useState("")
    const [changeroom, setChangeroom] = useState(false)
    const getmyself=async()=>{
        const user=await axios.post(`${host}/api/auth/getuser`,{},{
            headers:{
              "auth-token":Cookies.get('auth-Tokennpk')
            }
          })
          const data=user.data;
          const na=data.user.name.split(" ")[0];
            setName(na)
            setPhone(data?.user?.phone)
    }

    const [userall,setUserall]=useState([]);
    const getuser=async()=>{
        const res=await axios.get(`${host}/api/auth/getAllUser`);
        const data=res.data;
            setUserall(data);
    }
    
const handleroominfo=async(n,phon)=>{
    setChangeroom(!changeroom)
    let room=[phon.toString(),phone.toString()]
    room.sort();
    let roominfo=room[0]+room[1];
    setRoom(roominfo)
    console.log(roominfo)
    const create=await axios.post(`${host}/api/chat/addchat`,{room:roominfo,message:{text:"Welcome",user:"admin"}});
    const data=create.data;
    console.log(data);
    navigate(`/room?name=${name+(phone.toString()).slice(7)}&room=${roominfo}&other=${n}`);
}
    useEffect(() => {
    getuser();
    getmyself()
    }, [])

   
    
  return (
    <div className='container m-auto mb-[6.5rem]'>
        <div className='text-center text-xl font-bold'>Community</div>
        <hr className='my-3'/>
        <div className='container'>
     
        <div className='w-[80%] m-auto'>
        <div className=''>
        <div>
            <div className='flex flex-col justify-center items-center h-'>
            <div className=''>
            <Avatar name={name}/>
            </div>
        <div className='text-center text-xl font-bold my-4 text-green-600'>
           {
            name+(phone.toString()).slice(7)
           }
        </div>
            </div>
           
        <div className='font-bold text-center'>
            People under the range
        </div>
        <div >
        <div className='font-bold my-3' >
           Conversations
        </div>
</div>
       <div>
        {
            userall.map((e,i)=>{
                return (
                    <>
                       
                    {(e?.name?.split(' ')[0]!==name) ?  <div className='flex gap-4 items-center'> <Avatar size='50px' name={e?.name}/> <div className='text-lg font-semibold' key={i} onClick={()=>{handleroominfo(e?.name,e?.phone)}}>
                        {e?.name}
                    </div>  </div> : <div></div> }
                    <hr className='my-1'/>
                    </>
                )
            })
        }
        </div>
        </div>
   
        </div>
        </div>
        </div>
    </div>
  )
}

export default Community