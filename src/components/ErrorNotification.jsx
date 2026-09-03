import React from 'react'
import '../styles/components/error.css'

const ErrorNotification = (props) => {
    return (
        <div id='error-notification'>{props.error}</div>
    )
}

export default ErrorNotification;