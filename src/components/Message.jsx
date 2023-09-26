import userImg from '../img/avatar.jpg';

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={userImg} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={userImg} alt="" />
      </div>
    </div>
  );
};

export default Message;
