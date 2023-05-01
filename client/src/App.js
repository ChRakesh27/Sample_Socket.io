import io from 'socket.io-client'
import { useEffect, useState } from 'react';


const socket = io.connect("https://mychart-3-0.herokuapp.com/")

function App() {
  const [mess, messState] = useState('');
  const [messRes, messResState] = useState('');
  const [join, joinState] = useState('');
  const joinroom = () => {
    if (join !== '') {
      socket.emit("join_room", join);
    }
  }
  const sendMes = () => {
    socket.emit("send_mess", { mess, join });
  }
  useEffect(() => {
    socket.on("receive_mes", (data) => {
      messResState(data.mess);
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder="roomId" onChange={(event) => {
        joinState(event.target.value)
      }} />
      <button onClick={joinroom}>join</button><br></br><br></br>
      <input placeholder="Message" onChange={(event) => {
        messState(event.target.value)
      }} />
      <button onClick={sendMes}>Send</button>
      <h2>Messages:</h2>
      {messRes}
      {/* ${socket} */}
    </div>
  );
}

export default App;
