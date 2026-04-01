import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader';

const Makepayment = () => {

    // Destructure the product details passed from the Getproducts component
    // UseLocation hook allows us to get/destructure the props passed from the previuos component
    const {product} = useLocation().state || {} 

    // Declare the navigate hook
    const navigate = useNavigate();
    
    // console.log("The details passed from Getproducts are:",product)

    // Below is the image base URL
    const img_url= "https://nkiroterakel.alwaysdata.net/static/images/"

    // initailize hooks to manage the state of the appliaction
    const [number,setNumber] = useState("");
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState("");
    const [error,seterror] = useState("");
    
    // Create a function to help with the handle submit function
    const handlesubmit = async (e) =>{
        // Prevent site from reloading
        e.preventDefault()

        // Update loading hook
        setLoading(true)

        try{
            // Create a formData object
            const formdata = new FormData()

            // Append the dateils onto the formdata
            formdata.append("phone",number);
            formdata.append("amount",product.product_cost);

            // Interact with the response
            const response = await axios.post("https://nkiroterakel.alwaysdata.net/api/mpesa_payment",formdata)

            // setLoading back to default
            setLoading(false);

            // Update the success hook with amessage
            setSuccess(response.data.message)

        }
        catch(error){
            // If there is an error respond to error
            setLoading(false);

            // Update the error hook with error message
            seterror(error.message)
        }
    }

return (
    <div className='row justify-content-center'>

        <div className="col-md-1 mt-3">
            <input type="button"
            className="btn btn-danger"
            value="Back"
            onClick={() => navigate("/")} />
        </div>

        <h1 className="text-success">Make Payment - Lipa na Mpesa</h1>

        <div className="col-md-6 card shadow p-4 bg-dark">
            <img src={img_url + product.product_photo} alt="Product name" className='pic'/> <br />

            <div className="card-body bg-secondary body">
                <h2 className="text-info">{product.product_name}</h2>

                <p className="text-dark">{product.product_description}</p>

                <b className="text-warning">Kes {product.product_cost}</b>

                <form onSubmit={handlesubmit}>
                {loading && <Loader />}

                    <h3 className="text-dark">{success}</h3>
                    <h4 className="text-danger">{error}</h4>


                    <input type="number"
                    className='form-control'
                    placeholder='Enter phone number 254XXXXXXXX'
                    required 
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}/> <br /> 

                    {/* <p className="text-light">{number}</p> */}

                    <input type="submit"
                    value="Make Payment"
                    className='btn btn-success' />
                </form>
            </div>
        </div>

    </div>
)
}

export default Makepayment;