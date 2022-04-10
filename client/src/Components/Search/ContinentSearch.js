import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ContinentSearch = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={continents}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Continents" />}
    />
  );
}

const continents = [
    {label: 'North America'},
    {label: 'South America'},
];


export default ContinentSearch;