import { useContext, useEffect, useRef } from 'react';
import userImg from '../img/avatar.jpg';
import { authContext, chatContext } from '../context/authContext';

const Message = ({ message }) => {
  console.log(message, 'message in message');
  console.log('I am in message');
  const { currentUser } = useContext(authContext);
  const { data } = useContext(chatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
