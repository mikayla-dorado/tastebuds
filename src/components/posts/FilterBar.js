export const FilterBar = ({ setSearchTerm, allCuisines, setChosenCuisine }) => {


    return (
                <div className="filter-by-cuisine">

                
                    {/* <h2 className="filter-topic">Filter by cuisine:</h2> */}
                    

                {/* this select creates a dropwdown element */}
                <div className="alltopics-dropdown w-32">
                    <select
                        name="cuisines"
                        id="cuisines"
                        onChange={(event) => {
                            //this if checks to see if the selected value from dropdown is equal to"0"
                            //if so it sets the 'chosenTopic' state to 'null' using the 'setChosenTopic' function
                            if (event.target.value === "0") {
                                setChosenCuisine(null)
                            } else {
                                //uses .find to search for a topic in 'allTopics' array where the topic.id
                                //matches the value that is selected, assigns the found topic to 'foundTopic' variable

                                const foundCuisine = allCuisines.find((cuisine) => cuisine.id === parseInt(event.target.value))

                                //if a topic is found but doesn't equal "0", this line sents 'chosenTopic' state
                                //to the found topic using the 'setChosenTopic' function
                                setChosenCuisine(foundCuisine)
                            }
                        }}>
                        <option className="select-cuisines border w-40" value="0">All Cuisines</option>

                        {/* using the allTopics prop */}

                        {allCuisines.map((cuisine) => {
                            return (<option value={cuisine.id} key={cuisine.id}>{cuisine.type}</option>)
                        })}
                    </select>
                    </div>

                        {/* this makes the search bar */}
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