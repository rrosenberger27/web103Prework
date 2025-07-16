import React, { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const AddCreator = ({fetchCreators}) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [improperSubmission, setImproperSubmission] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleImageURLChange = (e) => setImageURL(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!name || !url || !description || !imageURL) {
            // could make this something more graceful
            setImproperSubmission(true);
            return;
        }

        setImproperSubmission(false);

        try {
            const {error} = await supabase.from('creators')
            .insert({
                name: name,
                url: url,
                imageURL: imageURL,
                description: description,
            });

            if (error) {
                console.error('Error inserting new creator:', error);
            } else {
                console.log('Successfully added creator!');
                await fetchCreators();
                navigate('/');
            }
        } catch (error) {
            console.error("An unexpected error occured : ", error);
        }
    }

    return (
        <div className="add-creator-container">
            <div className="top-panel">
                <button className="back-arrow-add-creator" onClick={() => navigate('/')}>
                    &larr;
                </button>
                <h3 className="add-header"> 
                    Add Creator
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name :
                    <textarea name="name" placeholder="IShowSpeed" onChange={handleNameChange} />
                </label>
                <label>
                    Platform Url :
                    <textarea name="url" placeholder="https..." onChange={handleUrlChange} />
                </label>
                <label>
                    Image Url :
                    <textarea name="imageURL" placeholder="https..." onChange={handleImageURLChange} />
                </label>
                <label>
                    Description :
                    <textarea name="description" placeholder="IShowSpeed is a famous streamer with..." onChange={handleDescriptionChange} />
                </label>

                <button type="submit" className="add-creator-btn"> Add Creator! </button>
            </form>
            {improperSubmission && <p className="improper-submission">
               Please check to make sure all fields are filled out </p>}

        </div>
    )
}

export default AddCreator;