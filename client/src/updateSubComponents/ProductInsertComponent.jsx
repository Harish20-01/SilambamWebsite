import React, { useState } from 'react'
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/aboutInsertStyle.css';
const ProductInsertComponent = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState();
    const [description, setDescription] = useState('');
    const [additionalFiles, setAdditionalFiles] = useState([]);
    const [discout,setDiscount]=useState(0);
    const { showError, showSuccess } = useToast();
    const [isProcessing, setIsPreocessing] = useState(false);
    const url = import.meta.env.VITE_SERVER_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPreocessing(true);

        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("discount",discout);
        data.append("description", description);
        data.append("image", file);
        if(additionalFiles.length==0)
        {
            showError("Should contain atleast one additonal Image");
            return;
        }
        if(additionalFiles.length>5){
            showError("Additional Image Length should be less than or equal to 5");
            return;
        }
        additionalFiles.forEach((file) => {
            data.append("additionalImages", file);
        });

        try {
            const response = await axios.post(`${url}/silambam-products`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });

            if (response.status === 200) {
                setDescription('');
                setFile(null);
                setPrice('');
                setDiscount(0);
                setName('');
                setAdditionalFiles([]);
                setIsPreocessing(false);
                showSuccess('Product inserted successfully!');
            } else {
                showError('Something went wrong.');
                setIsPreocessing(false);
            }
        } catch (error) {
            console.error(error);
            showError('Error occurred while uploading. Please try again.');
            setIsPreocessing(false);
        }
    };


    return (
        isProcessing ? (<Processing content='Inserting new Products..' />) : (
            <div id="AboutInsert-Container" >
                <h2>
                    Product Insert Section
                </h2>
                <h3>
                    Insert the data
                </h3>
                <form onSubmit={handleSubmit} style={{height:"auto"}}>
                    <label>Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label>Price</label>
                    <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                    <label>Discount</label>
                    <input
                        type="number"
                        required
                        value={discout}
                        onChange={(e) => setDiscount(e.target.value)}
                    ></input>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label>Upload Main Image</label>
                    <input
                        type='file'
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    ></input>
                    <label>Upload Additional Images (max 5)</label>
                    <input
                        type='file'
                        multiple
                        accept="image/*"
                        onChange={(e) => setAdditionalFiles([...e.target.files])}
                    />
                    <div id="Aboutinsert-Submit-Button">
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        )
    )
}

export default ProductInsertComponent;
