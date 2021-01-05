import React from 'react'

const Message = ({variant, color, children}) => {
    return ( 
        <div className={`bg-${color}-${variant} p-5 my-4 text-white`}>
            {children}
        </div>
    );
}

Message.defaultProps = {
    variant: 'info',
    color: 'red'
}

export default Message;