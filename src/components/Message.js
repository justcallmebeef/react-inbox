import React from 'react'; 


const Message = (props) => {
    return props.messages.map((message) => {
    return (
        <>
        <div className={`row message ${message.read ? 'read' : 'unread' }`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" />
                    </div>
                    <div className="col-xs-2">
                        <i id={message.id} onClick={props.markStarred} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                <span className="label label-warning">{message.labels[0]}</span>
                <span className="label label-warning">{message.labels[1]}</span>
                <span className="label label-warning">{message.labels[2]}</span>
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
        <div className="row message-body hidden">
            <div className="col-xs-11 col-xs-offset-1">
                {message.body}
            </div>
        </div>
        </>
    )
    })
}

export default Message;