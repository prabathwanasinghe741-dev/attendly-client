import React from 'react';
import { eraseToken, readToken } from './session';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from './routes';

const Session = ({ requiredRole, optionalRole }) => {
    const navigate = useNavigate();
    async function manageSession() {
        if (readToken()) {
            const status = await verifyToken(readToken());
            if (status.success) {
                if (status.data == requiredRole) {
                    return;
                } else if (status.data == optionalRole) {
                    navigate(`/${optionalRole == 'user' ? "educator" : "admin"}`)
                } else {
                    eraseToken();
                    navigate('/')
                }
            } else {
                eraseToken();
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }
    React.useEffect(() => {
        manageSession();
    }, [])
    return (
        <div></div>
    )
}

export default Session;