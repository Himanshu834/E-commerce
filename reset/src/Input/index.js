import { useState } from "react";
import './style.css'
const MaterialInput = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="materialInput" style={{fontFamily:'Salsa'}}>
            <label className={`label ${focus ? 'focus' : ''}`} style={{
                paddingLeft:'12px',
                paddingTop:'12px',
                lineHeight: 'none',
                fontFamily: 'Salsa',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '18px',
                // top:'-12px'
            }}>{props.label}</label>
            <div style={{
                display: 'flex'
            }}>
                <input className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={(e) => {
                        setFocus(true);
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") {
                            setFocus(false);
                        }
                    }} />
                {
                    props.rightElement ? props.rightElement : null
                }
            </div>
        </div>
    )
}

const MaterialButton = (props) => {
    const onClick = () => {
        props.onClick && props.onClick();
    }
    return (
        <div style={{ width: '100%', ...props.style }}>
            <button
                className="materialButton"
                style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    background: props.bgColor,
                    color: props.textColor,
                    height:'56px',
                    fontWeight:'600'
                }}
                onClick={onClick}
            >
                <p style={{fontSize:'20px'}}>{props.icon && props.icon}</p>
                <p>&ensp;</p>
                <p className='title'>{props.title && props.title}</p>
                
            </button>
        </div>

    )
}
export {
    MaterialInput,
    MaterialButton,
}