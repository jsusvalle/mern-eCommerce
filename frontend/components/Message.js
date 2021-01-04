import React from 'react'

const Message = ({variant, children}) => {
    return ( 
        <div className={`bg-red-${variant} p-5 my-4 text-white`}>
            {children}
        </div>
    );
}

Message.defaultProps = {
    variant: 'info'
}

export default Message;