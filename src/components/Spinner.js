
const Spinner = () => {
    const spinnerStyle = {
        border: "8px solid #f3f3f3",
        borderTop: "8px solid #3498db",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        animation: "spin 1s linear infinite"
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        margin: "20px 0"
    };
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
            <div style={containerStyle}>
                <div style={spinnerStyle}></div>
            </div>
        </>
    );
}

export default Spinner;
