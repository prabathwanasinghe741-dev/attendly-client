import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { eraseToken } from '../services/session';
import Session from '../services/Session.jsx';
import '../styles/pages/educator.css'
import { aboutMe, amIin, leaveClass } from '../services/routes.js';
const NoProfilePic = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 80 80" fill="none">      <circle cx="40" cy="40" r="40" fill="#F2F2F7" />      <circle cx="40" cy="32" r="14" fill="#000" fillOpacity="0.15" />      <path d="M16 70 C16 54 28 48 40 48 C52 48 64 54 64 70" fill="#000" fillOpacity="0.15" />    </svg>
);

const Educator = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [classID, setClassID] = useState(null)
    const [enrolledStatus, setEnrollStatus] = React.useState(false);
    async function updateDataBoard() {
        const status = await aboutMe();
        setUser(status.data);
        const entered = await amIin();

        if (entered.data) { setEnrollStatus(true); setClassID(entered.massage.id) }
    }
    useEffect(() => {
        updateDataBoard();
    }, []);
    return (
        <div className="educator-root">
            <Session requiredRole="user" optionalRole="admin" />
            <div id="navigation-bar">
                {/* app name looks like instagram cursive */}
                <div id="app-name">Attendly</div>
                <div id="actions">
                    <button onClick={() => {
                        eraseToken();
                        navigate('/');
                    }}>Logout</button>
                </div>
            </div>
            <div id="application-context">
                <div id="profile-view">
                    <div id="svg-container">
                        <NoProfilePic />
                    </div>
                    <div id="information-container">
                        <div className="one-row">
                            <label htmlFor="fname">Firstname :</label>
                            <span id="fname">{!user ? "" : user.firstname}</span>
                            <label htmlFor="lname">Lastname :</label>
                            <span id="lname">{!user ? "" : user.lastname} </span>
                        </div>
                        <div className="one-row">
                            <label htmlFor="section">Section :</label>
                            <span id="section">{!user ? "" : user.section}  </span>
                        </div>
                        <div className="one-row">
                            <label htmlFor="email">Email :</label>
                            <span id="email">{!user ? "" : user.email}  </span>
                            <label htmlFor="password">Password :</label>
                            <span id="password">************ </span>
                        </div>
                    </div>
                </div>
                <div id="featuring-view-cards-container">
                    <button id="entrance-card" className={enrolledStatus ? "disabled" : ""} onClick={() => {
                        navigate('/educator/scan');
                    }}>
                        <div className="svg-container">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="16" fill="#16A34A" /><path d="M13 10L19 16L13 22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <div className="text" >Enter Now</div>
                    </button>
                    <button id="leave-card" className={enrolledStatus ? "" : "disabled"} onClick={async () => {
                        const data = await leaveClass(classID);
                        if (data.success) setEnrollStatus(false);
                    }}>
                        <div className="svg-container">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="16" fill="#DC2626" /><path d="M19 10L13 16L19 22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <div className="text" >Leave Now</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Educator;