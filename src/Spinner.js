import React, { Component } from 'react';

class Spinner extends Component {
    spinnerStyle = {
        border: "8px solid #f3f3f3",
        borderTop: "8px solid #3498db",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        animation: "spin 1s linear infinite"
    };

    containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        margin: "20px 0"
    };

    render() {
        return (
            <>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <div style={this.containerStyle}>
                    <div style={this.spinnerStyle}></div>
                </div>
            </>
        );
    }
}

export default Spinner;
