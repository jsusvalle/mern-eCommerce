import React from 'react'

const Message = ({variant, children}) => {
    return ( 
        <div variant={variant}>
            {children}
        </div>
    );
}

Message.defaultProps = {
    variant: 'info'
}

export default Message;