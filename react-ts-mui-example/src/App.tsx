import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function App() {

  return (
    <>
     <h1>MUI Component</h1>
     <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
    </>
  )
}

export default App
