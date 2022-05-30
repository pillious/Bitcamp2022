/* Add any dependencies you need . */
/* import your components */
// import AnimalSearch from "./AnimalSearch";

import SubmitButton from "./SubmitButton";
import AnimalSearch from "./AnimalSearch";
// import ContinentSearch from "./ContinentSearch";
import classes from "./Search.module.css";

const Search = () => {
  return (
    <div className={classes.search_row}>
      <div className={classes.search_boxes}>
        <div className={classes.animal_search_wrapper}>
          <AnimalSearch/>
        </div>
      </div>
      <SubmitButton className={classes.submit_button}/>
    </div>
  )
}

export default Search;