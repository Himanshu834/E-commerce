  
import React from 'react'

function input(props) {
    return (
        <div>
            {props.label && <label><h4>{props.label}</h4></label>}
            <br/>
            <input 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <p className="text-muted">
                {props.errorMessage}
            </p>
        </div>
    )
}

export default input