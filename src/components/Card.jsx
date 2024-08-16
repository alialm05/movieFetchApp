import propTypes from 'prop-types';
import movieImg from "../assets/movieplace.png"
import { Link } from 'react-router-dom';

function Card(props = defaultProps){

    if (props.cardType === "Genre") {
        return (
        <div className="card" >
            <Link key={props.id} to={`/genres/${props.id}`}>
            
                <h2 className="card-title">{props.title}</h2>

                <img className="card-image" alt="Movie Poster" 
                src={props.img && props.img ||  defaultProps.img}>
                </img>
            </Link>
        </div>
        )
    }
    else{
        //console.log(props.id)
        return(
            <div>
                <div className="card">
                    <Link className='m-0 py-0 h-full w-48 grid rounded-md' key={props.id} to={`/movie_page/${props.id}`}>
                        
                        <div className='m-0'>

                            <img className=
        "w-full object-contain min-h-60 h-full max-h-60 rounded-xl hover:scale-105 transform transition duration-300" 
                            
                            alt="Movie Poster" 
                            src={props.img && props.img ||  defaultProps.img}/>
                            
                        </div>
                        
                        <h2 className=
                        "hover:text-purple-600 text-white py-2 text-ellipsis overflow-hidden truncate">{props.title}</h2>

                    
                    {/*<p className="card-desc">{props.desc}</p>*/}
                    </Link>

                </div>

                    <p className="text-white font-medium flex items-center justify-center py-1">
                        {props.rating && "⭐" + (Math.round(props.rating * 10)/10) 
                        || !props.rating && "⭐" + defaultProps.rating}
                        
                        </p>
                    <p className="text-neutral-600 flex items-center justify-center mb-5">
                        {props.releaseYear && props.releaseYear}
                        {!props.releaseYear && "N/A"}
                    </p>

            </div>
            
        )
    }

    
}

const defaultProps = {
    title: "Movie Title",
    desc: "Movie Description",
    rating: "N/A",
    releaseYear: "N/A",
    img: movieImg,
    cardType: null,
    id: 0,

}

Card.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    rating: propTypes.number,
    releaseYear: propTypes.string,
    releastDate: propTypes.string,
    img: propTypes.string,
    cardType: propTypes.string,
    id: propTypes.number,

}


export default Card