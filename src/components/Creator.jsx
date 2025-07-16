import React from "react";
import { useNavigate } from "react-router-dom";

const Creator = ({id, name, url, description, imageURL}) => {
    const navigate = useNavigate();

    return (
        <div className="creator-container">
            <div className="creator-nav">
                <button className="view-bttn" onClick={() => navigate(`/view/${id}`)}>
                    &#x1F441;
                </button>
                <button className="edit-bttn" onClick={() => navigate(`/edit/${id}`)}>
                   &#9998; 
                </button>
                <h3>
                    {name}
                </h3>
            </div>

            <div className="creator-info">
                <img className="creator-img" src={imageURL} alt={`Image of ${name} - invalid url/image`}/>
                <p className="creator-description">
                    {description}
                </p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="creator-link">
                   Link to their platform! 
                </a>
                
            </div>

        </div>
    )
}

export default Creator;