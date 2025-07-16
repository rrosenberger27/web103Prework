import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate, useParams } from "react-router-dom";

const EditCreator = ({fetchCreators}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");

    const [improperSubmission, setImproperSubmission] = useState(false);
    const handleNameChange = (e) => setName(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleImageURLChange = (e) => setImageURL(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    useEffect(() => {
            const fetchCreator = async () => {
                try {
                    const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', id)
                    .single();
                    
                    if (error) {
                        navigate('/');
                        console.error('Error fetching creator: ', error);
                    } else {
                        setName(data.name);
                        setImageURL(data.imageURL);
                        setDescription(data.description);
                        setUrl(data.url);
                    }
                } catch (error) {
                    navigate('/')
                    console.error("An unexpected error occured: ", error);
                }
            }
            fetchCreator();         
    }, [id, navigate]);

    const updateCreator = async (event) => {
        event.preventDefault();

        if (!name || !description || !imageURL || !url) {
            setImproperSubmission(true);
            return;
        }
        setImproperSubmission(false);

        try {
            const {error} = await supabase
            .from('creators')
            .update({
                name: name,
                url : url,
                description: description,
                imageURL: imageURL 
            })
            .eq('id', id);

            if (error) {
                console.error('Error updating creator: ', error);
                alert("Error handling submission. Please try again.");
            } else {
                // go back to view page
                await fetchCreators();
                navigate(`/view/${id}`);
            }
        } catch (error) {
            console.error("An unexpected error occured: ", error);
            alert("Error handling submission. Please try again.");
        }
    }

    const deleteCreator = async (event) => {
        event.preventDefault();

        try {
            const {error} = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

            if (error) {
                console.error('Error deleting creator: ', error);
                alert("Error deleting creator. Please try again.")
            } else {
                await fetchCreators();
                navigate('/');
            }
        } catch (error) {
            console.error("An unexpected error occured: ", error);
            alert("Error deleting creator. Please try again.")
        }
    }


    return (
        <div className="edit-creator-container">
            <div className="top-panel">
                <button className="back-arrow-edit-creator" onClick={() => navigate('/')}>
                    &larr;
                </button>
                <button className="view-creator-bttn" onClick={() => navigate(`/view/${id}`)}>
                    &#x1F441;
                </button>
                <button className="delete-bttn" onClick={deleteCreator}>
                    &#128465;
                </button>
                <h3>
                    Edit Creator
                </h3>
            </div>
            <form onSubmit={updateCreator}>
                <label>
                    Name :
                    <input type="text" name="name" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Platform Url :
                    <input type="text" name="url" value={url} onChange={handleUrlChange} />
                </label>
                <label>
                    Image Url :
                    <input type="text" name="imageURL" value={imageURL} onChange={handleImageURLChange} />
                </label>
                <label>
                    Description :
                    <input type="text" name="description" value={description} onChange={handleDescriptionChange} />
                </label>

                <button type="submit" className="edit-creator-bttn"> Save Changes! </button>
            </form>
            {improperSubmission && <p className="improper-submission">
               Fields can't be empty. </p>}

        </div>
    )
}

export default EditCreator