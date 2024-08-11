import propTypes from 'prop-types';
import movieImg from "./assets/movieplace.png"

function Card(props = defaultProps){

    return(
        <div className="card">
            <img className="card-image" alt="Movie Poster" 
            src={props.img && props.img ||  defaultProps.img}>
            </img>
            
            <h2 className="card-title">{props.title}</h2>
            
            <p className="card-rating">
                {props.rating && "⭐" + (Math.round(props.rating * 10)/10) 
                || !props.rating && "⭐" + defaultProps.rating}
                
                </p>
            <p className="card-desc">
                {props.releaseYear && props.releaseYear}
                {!props.releaseYear && "N/A"}
            </p>
            {/*<p className="card-desc">{props.desc}</p>*/}
        </div>

    )
}

const defaultProps = {
    title: "Movie Title",
    desc: "Movie Description",
    rating: "N/A",
    releaseYear: "N/A",
    img: movieImg
}

Card.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    rating: propTypes.number,
    releaseYear: propTypes.string,
    releastDate: propTypes.string,
    img: propTypes.string
}


export default Card