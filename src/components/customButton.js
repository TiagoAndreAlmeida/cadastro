import React from 'react'

const CustomButton = ({label}) => {
    return (
        <div className="pure-control-group">                                  
            <label></label> 
            <button type="submit" className="pure-button pure-button-primary">{label}</button>                                    
        </div>
    );
}

export default CustomButton;