

const Chat = ({ descendingOrderMessages }) => {
  return (
    <>
    <div className="chat-display">
      {descendingOrderMessages.map((message, _index) => (
        <div key={_index}>
          <div className="chat-message-header">
            <div className="img-container img-container-chat">
              <img src={message.img} alt={message.first_name + " profile"} />  
            </div>
            <div className="chat-message-box">
            <p className="chat-message">{message.message}</p>
            <p className="chat-message-name">{message.name}</p>
            </div>
  
          </div>
          
        </div>
       )) }
    </div>
  </>
  )
}


export default Chat