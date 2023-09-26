import { BsCameraVideo } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Ahmad</span>
        <div className="chatIcons">
          <span>
            <BsCameraVideo />
          </span>
          <span>
            <FiMoreHorizontal />
          </span>
          <span>
            <AiOutlineUserAdd />
          </span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
