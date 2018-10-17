import React from 'react'; 


const Message = (props) => {
    return props.messages.map((message) => {
    return (
        <div className="row message read">
        <div className="col-xs-1">
            <div className="row">
            <div className="col-xs-2">
                <input type="checkbox" />
            </div>
            <div className="col-xs-2">
                <i className="star fa fa-star"></i>
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
    )
    })
}

export default Message;