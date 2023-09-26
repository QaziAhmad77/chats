import { IoMdAttach } from 'react-icons/io';
import { FaRegImage } from 'react-icons/fa';

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type somthing..." />
      <div className="send">
        <span>
          <IoMdAttach />
        </span>
        <input type="file" style={{ display: 'none' }} id="file" />
        <label htmlFor="file">
          <span>
            <FaRegImage />
          </span>
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
