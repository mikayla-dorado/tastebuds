export const FilterBar = ({ setSearchTerm, allCuisines, setChosenCuisine }) => {


    return (
        <div className="filter-by-cuisine">
            <div className="alltopics-dropdown w-32">
                <select
                    name="cuisines"
                    id="cuisines"
                    onChange={(event) => {
                        if (event.target.value === "0") {
                            setChosenCuisine(null)
                        } else {
                            const foundCuisine = allCuisines.find((cuisine) => cuisine.id === parseInt(event.target.value))
                            setChosenCuisine(foundCuisine)
                        }
                    }}>
                    <option className="select-cuisines border w-40" value="0">All Cuisines</option>

                    {allCuisines.map((cuisine) => {
                        return (<option value={cuisine.id} key={cuisine.id}>{cuisine.type}</option>)
                    })}
                </select>
            </div>
            <div className="search-term w-52">
                <input
                    type="text"
                    placeholder="Search Posts"
                    className="search-posts "
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                />
            </div>
        </div>
    )
}