import Add from '../img/camera_avatar.jpg';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { useState } from 'react';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  console.log(errMsg, 'THis is err');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      setErrMsg('');
      console.log(displayName, email, password);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Upload the new image to Cloud Storage
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

      // Second Method to upload image
      //   const storageRef = ref(storage, `/users/${displayName}`);
      //   const uploadTask = uploadBytesResumable(storageRef, file);
      //   uploadTask.on(
      //     (err) => {
      //       setErrMsg(err.message);
      //     },
      //     () => {
      //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //         await updateProfile(res.user, {
      //           displayName,
      //           photoURL: downloadURL,
      //         });
      //         await setDoc(doc(db, 'users', res.user.uid), {
      //           uid: res.user.uid,
      //           displayName,
      //           email,
      //           photoURL: downloadURL,
      //         });
      //         await setDoc(doc(db, 'userChats', res.user.uid), {});
      //       });
      //     }
      //   );
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
