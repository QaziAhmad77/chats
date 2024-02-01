import Add from '../img/camera_avatar.jpg';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      setErrMsg('');
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // In summary, while both ref() and doc() can be used to create references, doc() is specifically designed for referencing Firestore documents within collections and is often used when you need to work with individual documents. ref() can be used for both documents and collections and is more flexible in that regard. The choice between the two depends on whether you're referencing a document or a collection and your preferred coding style.
      // Reference to a collection
      // const collectionRef = ref(db, 'users');
      // Reference to a document
      // const documentRef = ref(db, 'users/userId');

      const storageRef = ref(storage, `/Profile/${displayName}`);
      await uploadBytes(storageRef, file);
      // Get the download URL of the new image
      const downloadUrl = await getDownloadURL(storageRef);
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadUrl,
      });
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadUrl,
      });
      await setDoc(doc(db, 'userChats', res.user.uid), {});
      navigate('/login');
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ahmad Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <h4>{errMsg}</h4>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <div className="imgDiv">
              <img src={Add} alt="" />
            </div>
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          <p>
            You do have an account? <Link to="/login">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
