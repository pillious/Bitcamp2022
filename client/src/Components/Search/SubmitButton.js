import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const SubmitButton = () => {

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Submit</Button>
    </Stack>
  );
}

export default SubmitButton;