import React, { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const AddCreator = () => {
    // need name, url, imageUrl, description, and submit button
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
                <h3> 
                    Add Creator
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name :
                    <input type="text" name="name" placeholder="IShowSpeed" onChange={handleNameChange} />
                </label>
                <label>
                    Platform Url :
                    <input type="text" name="url" placeholder="https..." onChange={handleUrlChange} />
                </label>
                <label>
                    Image Url :
                    <input type="text" name="imageURL" placeholder="https..." onChange={handleImageURLChange} />
                </label>
                <label>
                    Description :
                    <input type="text" name="description" placeholder="IShowSpeed is a famous streamer with..." onChange={handleDescriptionChange} />
                </label>

                <button type="submit" className="add-creator-btn"> Add Creator! </button>
            </form>
            {improperSubmission && <p className="improper-submission">
               Please check to make sure all fields are filled out </p>}

        </div>
    )
}

export default AddCreator;