const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={message.messageType}>
            {message.content}
        </div>
    )
}

export default Notification