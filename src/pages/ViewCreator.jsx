import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import "../styles/ViewCreator.css";

const ViewCreator = () => {
    const [creator, setCreator] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const {data, error} = await supabase.from('creators').select("*")
                .eq('id', id)
                .single();

                if (error) {
                    console.error('Error fetching creator: ', error);
                } else {
                    setCreator(data);
                }
            } catch (error) {
                console.error("An unexpected error occured: ", error);
            }
        };

        fetchCreator();
    }, [id]);

    if (!creator) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="view-single-creator">
            <div className="single-creator-nav">
                <button className="single-back-arrow-bttn" onClick={() => navigate('/')} data-tooltip="View All Creators" >
                    &larr;
                </button>
                <button className="single-edit-bttn" onClick={() => navigate(`/edit/${id}`)} data-tooltip="Edit Creator" >
                   &#9998; 
                </button>
                <h3>View Creator </h3>
            </div>

            <div className="single-creator-info">
                <h3 className="single-creator-name">
                    {creator.name}
                </h3>
                <img className="single-creator-img" src={creator.imageURL} alt={`Image of ${name} - invalid url/image`} />
                <p className="single-creator-description">
                    {creator.description}
                </p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer" className="single-creator-link">
                   Link to their platform! 
                </a>
                
            </div>

        </div>
    )
    

}

export default ViewCreator;