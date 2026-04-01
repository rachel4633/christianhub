import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Signin.css';

const Signin = () => {

    //  Define two hooks for capturing/storing user input
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");

    // Declare the three additional hooks
    const[loading, setLoading]=useState("");
    const[success, setSuccess]=useState("");
    const[error, setError]=useState("");

    // Below is the useNavigate hook to redirect a user to another page on successful login/signin
    const navigate = useNavigate();

    // Below is the function to handle the sign in action
    const handlesubmit = async (e) =>{
        // Prevent site from reloading
        e.preventDefault()

        // Update the loading hook with a message
        setLoading("Please bear with us while we finalize your login.")

        try{
            // Create a FormData object to hold the email and the password.
            const data = new FormData();

            // Insert the email and the password on the FormData created
            data.append("email", email);
            data.append("password",password);

            // Interact with axios for the response
            const response = await axios.post("https://nkiroterakel.alwaysdata.net/api/signin",data);

            // Set the loading hook back to default.
            setLoading("");

            //  Check whether the user exists as part of the response from the API
            if (response.data.user){
                // If user is there ,definately the details entered during signin are correct.
                // setSuccess("Login Successful. Welcome!");
            
            // Store user details in local storage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                // If it is successful let the person get redirected to another page.
                navigate("/");
            }
            else{
            // The user is not found therefore the credentials entered on form were incorrect.
                setError("Login failed. Please try again!");
                
            }
        }
        catch(error){
            // setloading back to default
            setLoading("");

            // Update the error hook with a message
            setError("We have a problem. Try again!");
        }
    }




return (
    <div className='signin-container'>
        <div className="signin-card">
            <h1 className='text-warning'>Welcome Back </h1>

            <h5 className="text-primary">{loading}</h5>
            <h3 className="text-success">{success}</h3>
            <h4 className="text-danger">{error}</h4>

            <form onSubmit={handlesubmit}>
                <input type="email" 
                placeholder='Enter the email'
                className='form-input'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}/> <br />

                {/* <p className='text-light'>{email} <br /></p> */}


                <input type="password"
                placeholder='Enter your password'
                className='form-input'
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/> <br />

                {/* <p className='text-light'>{password} <br /></p> */}

                <input type="submit" value="Signin" className='add-btn' /> <br /> <br />

            <p className='lest'>Create an account if you don't have one <br /><Link to={'/signup'} className='link'>Register</Link></p>
            </form>
        </div>
        
    </div>
)
}

export default Signin;

// Storing user details into the local storage
    // It happens in the following steps:
        // Convert Data to JSON
        // Implementation of code
        // Data retrieval

    // NOTE: Although utilizing the local storage is convinient, it's not secure for sensitive info.
    // Due to this it is only safe for storing details like:
        // User preferences => Dark mode, Language
        // Non-sensitive profile info => Username
        // UI State => Sidebar collapsed/expanded