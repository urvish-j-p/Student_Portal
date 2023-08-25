import React from 'react';

const Titleheading = ({title}) => {
    return (
        <div className="title" style={{ backgroundColor: "black", borderRadius:"10px",margin: "10px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h4 style={{ color: "white", textAlign: "center" }}>{title}</h4>
    </div>
    
    );
};

export default Titleheading;