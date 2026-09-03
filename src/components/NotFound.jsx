import React from 'react'

const NotFound = ({
    variant = 'generic',
    title,
    description,
    searchQuery = '',
    primaryActionLabel = 'Go Home',
    onPrimaryAction = () => window.location.href = '/',
    secondaryActionLabel,
    onSecondaryAction
}) => {

    const icons = {
        generic: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="1.5" fill="#007AFF" stroke="none" />
                <path d="M12 10v2.5" />
            </svg>
        )
    }

    const content = {
        generic: {
            title: 'Oops! You got stuck.',
            desc: 'The URL Looks Like Broken. Try reloading or tap go home.'
        }
    }

    const c = content[variant] || content.generic

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'radial-gradient(at 50% 0%, #E8F1FF 0%, #F5F7FF 60%)',
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            boxSizing: 'border-box'
        }}>
            <div style={{
                padding: '48px 40px 40px',
                maxWidth: '440px',
                width: '100%',
                textAlign: 'center',
                boxSizing: 'border-box'
            }}>

                {/* Icon Container */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    {icons[variant]}
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1D1D1F',
                    letterSpacing: '-0.4px',
                    margin: '0 0 10px 0',
                    lineHeight: '1.25'
                }}>
                    {title || c.title}
                </h1>

                {/* Description */}
                <p style={{
                    fontSize: '15px',
                    fontWeight: '400',
                    color: '#6E6E73',
                    lineHeight: '1.5',
                    margin: '0 auto 32px auto',
                    maxWidth: '300px'
                }}>
                    {description || c.desc}
                </p>

                {/* Primary Action */}
                <button
                    onClick={onPrimaryAction}
                    style={{
                        background: '#007AFF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        height: '44px',
                        padding: '0 24px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        letterSpacing: '-0.1px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,122,255,0.1) inset',
                        fontFamily: 'inherit',
                        transition: 'background 0.15s ease, transform 0.15s ease'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#0066D6'}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#007AFF'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                    {primaryActionLabel}
                </button>

                {secondaryActionLabel && (
                    <button
                        onClick={onSecondaryAction}
                        style={{
                            background: 'transparent',
                            color: '#007AFF',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            marginTop: '16px',
                            padding: '8px',
                            fontFamily: 'inherit'
                        }}
                    >
                        {secondaryActionLabel}
                    </button>
                )}
            </div>
        </div>
    )
}

export default NotFound