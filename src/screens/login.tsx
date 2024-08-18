const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center bg-dark">
            <div style={{width: "30%"}} className="bg-light rounded px-4 py-4">
                <div style={{ marginBottom: '20px', fontSize: '30px' }} >Login</div>
                <input placeholder="Email" style={{height: '45px'}} className="form-control my-3" />
                <button style={{height: '45px'}} className="btn btn-primary my-1 w-100">Send OTP</button>
                <hr style={{ marginTop: '3px' }} />
                <div>Dont have an account ? <b>Create New</b></div>
            </div>
        </div>
    );
}

export default Login;