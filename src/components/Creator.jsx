import React from "react";

const Creator = ({props}) => {
    const {name, url, description, imageURL} = props;


    return (
        <div className="creator-card-container">
            <img src={imageURL} alt="This Creator Needs an Image!" />
            <div className="creator-info-container">
                <h3>
                    {name}
                </h3>
                <p src={url} className="creator-link">
                    Link to their platform!
                </p>
                <p> 
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Creator;