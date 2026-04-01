import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/Signup.css';

const Signup = () => {
    // Initialize the hooks
    const [username,setUsername]=useState("");
    // username= name of the hook \|/ setUsername= function
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [number,setNumber] = useState("");
    // console.log(username)

    // Define the three state of application will move to
    const[loading,setLoading]=useState("");
    const[success,setSuccess]=useState("");
    const[error,setError]=useState("");

    // Below is a function to handle the submit action
    const handleSubmit = async(e) => {
        // Below we prevent our site from reloading
        e.preventDefault()

        // Update our loading hook with a message that will be displayed to the users who will try to register
        setLoading("Please bear with us while we finalize your registration. This will only take a moment.")
        try{
            // Create a form data object that will enable you to capture the four detils entered on the form
            const formdata = new FormData();

            // Insert the four details(username,email,password,phone number) interms of key-value pairs.
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", number);

            // By use of Axois, we can access the method (POST)
            const response = await axios.post("https://nkiroterakel.alwaysdata.net/api/signup", formdata);

            // // --- MODIFIED AREA: SAVING TO LOCAL STORAGE ---
            // const userDetails = {
            //     username: username,
            //     email: email,
            //     phone: number,
            //     registrationDate: new Date().toISOString()
            // };
            // // Save the object as a JSON string
            // localStorage.setItem('registeredUser', JSON.stringify(userDetails));

// Created a userDetails object: Instead of just sending data to the server, we bundle the local state variables into a clean object. (Note:  the password was excluded for security reasons).
    // JSON.stringify: We converted the object into a string because localStorage cannot store raw JavaScript objects.
        // localStorage.setItem: This saves the data under the key 'registeredUser'. You can retrieve this later on a "Profile" or "Dashboard" page using JSON.parse(localStorage.getItem('registeredUser')).
            // If you want to verify the data is actually there, open your browser's Developer Tools (F12), go to the Application tab, and click on Local Storage in the left sidebar.

            // Set back the loading to default
            setLoading("");

            //  Just incase everything goes well update the success hook with a message.
            setSuccess(response.data.message)

            // Clear the hooks
            setUsername("");
            setEmail("");
            setPassword("");
            setNumber("");

            setTimeout(() => {
    setSuccess("");
}, 5000);
        }
        catch(error){
            // set the loading book back to default
            setLoading("");

            // Update the error hook with the message given back from the response
            setError(error.message)
        }
    }

    // Add this just before 'return' to see what's in storage every time the page renders
// console.log("Current Storage:", JSON.parse(localStorage.getItem      ('registeredUser')));

return (
    <div className='signup-container'>
        <div className="signup-card">
            <h1 className='text-warning'>Join the Faith Community</h1>

            <h5 className='text-warning'>{loading}</h5>
            <h3 className='text-success'>{success}</h3>
            <h4 className="text-danger">{error}</h4>

            <form onSubmit={handleSubmit}>


            <input type="text" 
            placeholder='Enter the Username'
            className='form-input' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required /> <br />

            {/* <p className='text-light'>{username} <br /></p> */}

            <input type="email"
            placeholder='Enter the email address'
            className='form-input' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/> <br />

            {/* <p className='text-light'>{email} <br /></p> */}
            
            <input type="password"
            placeholder='Enter the password'
            className='form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required /> <br />

            {/*<p className='text-light'>{password} <br /></p>*/}

            <input type="number"
            placeholder='Enter the mobilephone number'
            className='form-input' 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required/> <br />

            {/* <p className='text-light'>{number} <br /></p> */}

            <input type="submit" value="Signup" className="add-btn" /> <br /> <br />

            <p className='last'>Already have an account?<Link to={'/signin'} className='link'>Sign In</Link></p>
            </form>
        </div>
    </div>
)
}

export default Signup;

// Axios 
    // In React, Axios is prefered to fetch() since Axios can hold many things at a time.
    // Axios is also considered automatic in comparison to fetch().
    // Axios is prefered because;

        //It automatically converts your data to JSON(Automatic JSON Transformation)hence no more calling .json() on every response.
        // By use of Axios you can "intercept" requests or responses to inject auth tokens or handle errors globally using Interceptors.
        //It handles older browsers more better than the native Fetch API.
        //It allows you to easily abort a request if a component unmounts.

    // Its set up by installing the package using:
        // npm install axios

    // GET REQUEST
        // Performed within the useEffect hook to ensure it runs when the component mounts.
            // import React, { useState, useEffect } from 'react';
            // import axios from 'axios';

            // function UserList() {
            // const [users, setUsers] = useState([]);

            // useEffect(() => {
            //     // We define an async function inside the effect
            //     const fetchUsers = async () => {
            //     try {
            //         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            //         setUsers(response.data); // Axios puts the result in the 'data' property
            //     } catch (error) {
            //         console.error("Error fetching data:", error);
            //     }
            //     };

            //     fetchUsers();
            //   }, []); // Empty array means this runs once on mount

            // return (
            //     <ul>
            //     {users.map(user => <li key={user.id}>{user.name}</li>)}
            //     </ul>
            // );
            // }
    
    // POST REQUEST
            // const addUser = async (userData) => {
            // try {
            //     const response = await axios.post('/api/users', userData);
            //     console.log("User created:", response.data);
            // } catch (err) {
            //     console.error(err);
            // }
            // };

// Securing an API endpoint preventing unauthorized data entry

    // Focus targets on:
        // Authentication (who are you?)
        // Authorization (what are you allowed to do?)
        // Validation (is the data you're sending safe?)

    // Verification (of the sender identity) ought to be done by the use of:
        // OAuth2 / OpenID Connect = (The industry standard) Use Bearer tokens e.g JWT[JSON Web Token] to verify that the user has been authenticated by a trusted provider.
                // JSON Web Token contains the Header,Payload and Signature
        // API Keys = Useful for server-to-server communication, but less secure than tokens because they don't expire quickly. Always send these in the Request Header, never in the URL.
        // Role-Based Access Control (RBAC) = Just because someone is "logged in" doesn't mean they should be able to POST data. Ensure the user has the specific "Write" or "Admin" permissions required for that endpoint.

    // Validation (Client data ought not to be trusted since it may be coming from malicious users who would have bypassed your frontend forms and sent raw, dangerous data directly to your API).
        // This can be controlled by the use of:
            // Input Sanitization = Strip out HTML tags or script fragments to prevent Cross-Site Scripting (XSS).
            // Schema Validation: Use a library (like Joi, Zod, or JSON Schema) to ensure the incoming data matches the exact format you expect. If a field should be an integer, reject it if it's a string.
            // Parameterized Queries: If the API entry goes into a database, use parameterized queries to prevent SQL Injection.
// Rate Limiting and Throttling
    // Authorized users can also cause harm (or "Denial of Service") if they send too many requests.
        // Rate Limiting: Restrict the number of requests a single IP or User ID can make within a timeframe (e.g., 100 requests per minute).
        // Throttling: Gradually slow down the response time for users who are nearing their limit to discourage automated "brute-force" entry attempts.

//Encryption and Transport Security
        // HTTPS (TLS): This is non-negotiable. It encrypts the data in transit so that "Man-in-the-Middle" attackers cannot intercept or alter the data being sent to your endpoint.
        // CORS (Cross-Origin Resource Sharing): Configure your server to only accept requests from specific, trusted domains. This prevents unauthorized websites from making API calls on behalf of your users.