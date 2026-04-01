import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css';

const Addproducts = () => {

    // Introduce the hooks
    const [product_name,setProductName] = useState("");
    const [product_description,setProductDescription] = useState("");
    const [product_cost,setProductCost] = useState("");
    const [product_photo,setProductPhoto] = useState(null);
   

    // Declare the additional hooks to manage the state of the application
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState("");
    const [error,seterror] = useState("");

    // Create a function to handle the submit function
    const handleSubmit = async (e) => {

        // Crevent the site from reloading
        e.preventDefault()

        // setLoading hook with a message (activate it)
        setLoading(true)

        try{
            // Create the FormData to enter the product details
            const formdata = new FormData()

            // Append the details to th formdata created
            formdata.append("product_name",product_name);
            formdata.append("product_description",product_description);
            formdata.append("product_cost",product_cost);
            formdata.append("product_photo",product_photo);
           

            // Interaction with the axios module to help use the method post
            const response = await axios.post("https://nkiroterakel.alwaysdata.net/api/add_product",formdata);

            // Set the loading hook back to default
            setLoading(false)

            // Update the success hook with a message
            setSuccess(response.data.message)

            // Clearing the hooks(setting back to default/empty)
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");
            

            // Clearing(Defaulting/resetting) the input values
            e.target.reset()

            setTimeout(() => {
            setSuccess("");
            }, 4000);
        }
        catch (error){
            // setLoadine hook back to default
            setLoading(false)

            // Update seterror with a message
            seterror(error.message)
        }
    }

return (
    <div className='add-product-container'>
        <div className='add-product-card'>
            <h3 className='text-warning'>Addproducts</h3>
            
            {/* Bind the loading hook */}
            {loading && <Loader />}
            <h3 className="text-success">{success}</h3>
            <h4 className='text-danger'>{error}</h4>

            <form onSubmit={handleSubmit}>

                <input type="text"
                placeholder='Enter the product name'
                className='form-input'
                required 
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}/> <br />

                {/* <p className='text-light'>{product_name}</p> */}

                <input type="text"
                placeholder='Enter the product description'
                className='form-input'
                required
                value={product_description}
                onChange={(e) => setProductDescription(e.target.value)}/> <br />

                {/* <p className='text-light'>{product_description}</p> */}
                
                <input type="number"
                placeholder='Enter the price of the product'
                className='form-input' 
                required
                value={product_cost}
                onChange={(e) => setProductCost(e.target.value)}/> <br />

                {/* <p className='text-light'>{product_cost}</p> */}
                 
                
                <label className='text-primary'> Product Photo</label>
                <input type="file"
                className='form-input'
                required 
                accept='image/*'
                onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />
                


                <input type="submit"
                value="Add Product" 
                className='add-btn'/>
            </form>
        </div>


        
    </div>
)
}

export default Addproducts;