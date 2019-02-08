import React from 'react'

const CustomInput = ({name, id, type, value, onChange, label}) => {
    return (
        <div className="pure-control-group">
            <label htmlFor="nome">{label}</label> 
            <input id={id} type={type} name={name} value={value}  onChange={onChange} />                  
        </div>
    );
}

export default CustomInput;