import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AnimalSearch = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={animals}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Animals" />}
    />
  );
}

const animals = [
    {label: 'Goose'},
    {label: 'Sea Turtle'}
];


export default AnimalSearch;