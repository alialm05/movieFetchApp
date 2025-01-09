import { Link } from "react-router-dom";

function SideNavbar() {

    return (
        <div className="w-1/6 h-screen bg-gray-800 text-white">
            <div className="flex flex-col items-center justify-center">
                <Link to="/popular" className="mt-5">Popular</Link>
                <Link to="/upcoming" className="mt-5">Upcoming</Link>
                <Link to="/top_rated" className="mt-5">Top Rated</Link>
                <Link to="/search" className="mt-5">Search</Link>
                <Link to="/genres" className="mt-5">Genres</Link>
            </div>
        </div>
    )

}
