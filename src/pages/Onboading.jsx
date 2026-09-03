import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../styles/pages/onboading.css'
import { eraseToken, readToken } from '../services/session.js';
import { verifyToken } from '../services/routes.js';

const Onboading = () => {
    const [form, setForm] = React.useState(true);
    const navigate = useNavigate();
    React.useEffect(() => {
        async function run() {
            const token = readToken();
            if (token) {
                const status = await verifyToken(token);
                if (status.data == 'user') {
                    navigate('/educator')
                } else if (status.data == 'admin') {
                    navigate('/admin');
                } else {
                    eraseToken();
                }
            }
        }
        run()
    }, [navigate]);
    return (
        <div id='onboading-screen'>
            <div id="logo-container">
                <img src="/icon.png" alt="" />
            </div>
            <div id="form-container">
                <div id="form-title">{form ? "Find your account" : "Signup for Cloud"}</div>
                <div id="form-bin">
                    {form ? <LoginForm /> : <SignupForm />}
                </div>
                <div id="from-footer">
                    {form ? "No account created ?" : "Already have an account"}
                    <button onClick={() => { setForm(!form) }}>
                        {form ? "Signup" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Onboading;