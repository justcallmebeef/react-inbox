import React from 'react';


const Toolbar = (props) => {
return (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">2</span>
                unread messages
            </p>

            <a onClick={props.toggleMessage} className="btn btn-danger">
                <i className={`fa ${props.composeMessage ? 'fa-plus' : 'fa-minus' }`}></i>
            </a>

            <button className="btn btn-default">
                <i className="fa fa-minus-square-o"></i>
            </button>

            <button onClick={props.markAsRead} className="btn btn-default">Mark As Read</button>

            <button onClick={props.markAsUnread} className="btn btn-default">Mark As Unread</button>

            <select onChange={props.messageLabel} className="form-control label-select">
                <option>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select">
                <option>Remove label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default">
                <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
)
}

export default Toolbar;