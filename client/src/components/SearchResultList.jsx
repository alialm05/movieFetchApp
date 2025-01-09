import "./search-bar.css"

function SearchResultList ({results}) {

    return (
        <div className="results-list">
            {results && 
                results.map((result, id) => {
                    return <div className="result-item" key = {result.id}> {result.name}</div>
                })
            }
            {!results &&
                <div>
                    <div>A</div>
                    <div>A</div>
                    <div>A</div>
                    <div>A</div>
                </div>
            }
        </div>

    )

}

export default SearchResultList