import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://mychart-3-0.herokuapp.com/")
// const socket = io.connect("http://localhost:5000/")
function App() {
  let [joinId, joinIdState] = useState('1');
  let [username, usernameState] = useState('');
  let [msg, msgState] = useState(" ");
  let [msgList, msgListState] = useState([]);

  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    if (isJoined) {
      socket.on("receive_mess", (newMsg) => {
        console.log(newMsg)
        msgListState(oldMsgs => [...oldMsgs, newMsg])
      })
    }
  }, [isJoined])

  function joinRoom() {
    if (joinId !== '') {
      socket.emit("join_room", { joinId, username });
      socket.on("join_successful", (username) => {
        console.log("-----------------", username)
        setIsJoined(true)
      })
    }
  }

  function sendMessage() {
    if (msg.trim() !== '') {
      msgListState(oldMsgs => [...oldMsgs, { msg, username }])
      socket.emit("send_mess", { username, msg, joinId });
      msgState('')
    }
  }

  return (
    <div className="App">
      <input type='text' placeholder='roomId' value={joinId} onChange={(e) => joinIdState(e.target.value)}></input>
      <input type='text' placeholder='username' value={username} onChange={(e) => usernameState(e.target.value)}></input>
      <button onClick={joinRoom}>join</button><br></br><br></br>

      <input type='text' value={msg} onChange={(e) => msgState(e.target.value)}></input>
      <button onClick={sendMessage}>send</button>

      {
        isJoined && (
          <><h1>!! Welcome {username} !!</h1><ul>
            {msgList.map((item, index) => {
              return <li key={index}>{item.username}-{item.msg}</li>;
            })}
          </ul></>
        )
      }



    </div>
  );
}

export default App;
