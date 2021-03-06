import axios from 'axios'
import React, { useEffect, useState } from 'react'

function LongPulling() {
    const [messages,setMessages] = useState([])
    const [value,setValue] = useState('')
    function handlerInput(e) {
        setValue(e.currentTarget.value)
    }
    useEffect(() => {
            subscribe()
    },[])

    const subscribe = async () => {
        try {
        const {data} =    await axios.get('https://server-real-time-chat.vercel.app/get-messages',)
        setMessages(prev => [data, ...prev])
        await subscribe()
        } catch (e) {
            setTimeout(()=>{
                subscribe()
            },500)
        }
    }
    const sendMessage = async() => {
       await axios.post('https://server-real-time-chat.vercel.app/new-messages',{
        message:value,
        id: Date.now()
        })
    }
  return (
    <div>
      <div className='form'>
          <input value={value} onChange={handlerInput} type="text"/>
          <button onClick={sendMessage}>send</button>
      </div>
      <div className='messages'>
        {messages.map(mess=>{
            return <div key={mess.id} className='message'>
                {mess.message}
            </div>
        })}
      </div>
    </div>
  )
}

export default LongPulling
