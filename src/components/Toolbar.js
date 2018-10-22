import React from 'react';


const Toolbar = (props) => {

        let count = 0
        let addAnS = true
        props.messages.map(unread => {
          if (unread.read === false) {
            count += 1
          } 
        })
        if (count === 1) {
            addAnS = false
        }

return (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{count}</span>
                {`unread message${addAnS ? 's' : ''}`}
            </p>

            <a onClick={props.toggleMessage} className="btn btn-danger">
                <i className={`fa ${props.composeMessage ? 'fa-plus' : 'fa-minus' }`}></i>
            </a>

            <button className="btn btn-default">
                <i className="fa fa-minus-square-o"></i>
            </button>

            <button onClick={props.markAsRead} className="btn btn-default">Mark As Read</button>

            <button onClick={props.markAsUnread} className="btn btn-default">Mark As Unread</button>

            <select onChange={(e) => {props.messageLabel(e); e.target.selectedIndex = 0}} className="form-control label-select">
                <option selected disabled>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select onChange={(e) => {props.messageRemoveLabel(e); e.target.selectedIndex = 0}} className="form-control label-select">
                <option selected disabled>Remove label</option>
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