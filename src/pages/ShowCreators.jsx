import React from "react";
import Creator from "../components/creator";
import "../styles/ShowCreators.css";

const ShowCreators = ({creators}) => {
    
    return (
        <div className="all-creators-container">
            <h2> All Creators </h2>
            {creators && creators.length > 0 && creators.map((creator) => (
                <Creator 
                key={creator.id}
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
                />
            ))}

            {!creators || creators.length === 0 &&
            <p>No Creators to Display &#9785; </p>}
        </div>

    )
}

export default ShowCreators;