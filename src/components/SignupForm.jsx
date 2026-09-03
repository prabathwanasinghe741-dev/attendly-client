import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/components/auth.css'
import { getAllSections, registerUser } from '../services/routes';
import ErrorNotification from './ErrorNotification';
import { readToken, saveToken } from '../services/session.js';

const SignupForm = () => {
  const navigate = useNavigate();
  const [firstname, setFname] = React.useState(null);
  const [lastname, setLname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorState, setError] = React.useState(null);
  const [section, setSection] = React.useState('SCIENCE');
  const [sectionList, updateSectionList] = React.useState([]);
  useEffect(() => {
    const fetchStatus = async () => {
      const status = await getAllSections();
      updateSectionList(status.massage);
      console.log(status.massage);
    };
    fetchStatus();
  }, []);

  async function validateForm() {
    setError(null);
    if (!firstname || !lastname || !email || !password || !section) {
      setError("All the fileds are required");
    } else if (password.length < 8) {
      setError("Password must be least 8 characters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid Email Address")
    } else {
      try {
        const newUser = await registerUser({ firstname, lastname, email, password, section });
        if (newUser.success) {
          saveToken(newUser.data);
          navigate('/educator');
        } else {
          setError(newUser.error)
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }
  return (
    <div id="auth-form">
      <div style={{ display: (!errorState ? 'none' : "") }}>
        <ErrorNotification error={errorState} />
      </div>
      <div id="input-row">
        <div>
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            placeholder='John'
            id='firstname'
            onChange={(e) => { setFname(e.target.value) }}
            onPaste={(e) => { e.preventDefault(); }}
          />
        </div>
        <div>
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            placeholder='Doe'
            id='lastname'
            onChange={(e) => { setLname(e.target.value) }}
            onPaste={(e) => { e.preventDefault(); }}
          />
        </div>
      </div>
      <div className="input-row">
        <div>
          <label htmlFor="lastname">Section</label>
          <select name="" id="" onChange={(e) => {
            setSection(e.target.value)
          }}>
            {(sectionList.length > 0) ? sectionList.map((section) => {
              return (<option key={section.id} value={section.name}>{section.name}</option>)
            }) : "No Sections"}
          </select>
        </div>
      </div>
      <div id="input-row">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder='someone@example.com'
            id='email'
            onChange={(e) => { setEmail(e.target.value) }}
            onPaste={(e) => { e.preventDefault(); }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder='********'
            id='password'
            onChange={(e) => { setPassword(e.target.value) }}
            onPaste={(e) => { e.preventDefault(); }}
          />
        </div>
      </div>
      <div id="input-row">
        <div>
          <button
            onClick={() => {
              validateForm();
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;