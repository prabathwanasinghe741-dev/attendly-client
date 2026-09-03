import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import Session from '../services/Session.jsx'
import { getAllClass } from '../services/routes.js';
import '../../styles/pages/qrcode.css';

const QRCode = () => {
    const [cList, updateClist] = useState([]);
    
    async function fetchClassList() {
        const status = await getAllClass();
        if (status.success) updateClist(status.data);
    }
    useEffect(() => { fetchClassList(); }, [])

    return (
        <div className="qr-page">
            <Session requiredRole='admin' optionalRole='user' />
            
            <div className="qr-header">
                <h1>Attendly QR Codes</h1>
                <p>Print and place in classrooms</p>
            </div>

            <div className="qr-grid">
                {cList.map((c) => (
                    <div key={c.id} className="qr-card">
                        <div className="qr-img">
                            <QRCodeSVG
                                value={c.id}
                                size={190}
                                level="H"
                                bgColor="#ffffff"
                                fgColor="#000000"
                                includeMargin={true}
                            />
                        </div>
                        <div className="qr-info">
                            <p className="qr-name">{c.name}</p>
                            <p className="qr-section">{c.section}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default QRCode