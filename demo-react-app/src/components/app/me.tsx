

import { storageUsername, storageemail, storagefirstname, storagelastname } from "../../data_services/CustomAxios";
import { Box, Typography } from "@mui/material";
function Me(): React.JSX.Element {


  return (

<>
  <Typography component="h1" variant="h5">
    Informations
  </Typography>    
  <Box component="span" sx={{ display: 'inline' }}>prenom: </Box>
  <Box component="span" sx={{ display: 'inline' }}>{localStorage.getItem(storagefirstname)}</Box>
  <Box component="span" sx={{ display: 'block' }}></Box>
  <Box component="span" sx={{ display: 'inline' }}>nom: </Box>
  <Box component="span" sx={{ display: 'inline' }}>{localStorage.getItem(storagelastname)}</Box>
  <Box component="span" sx={{ display: 'block' }}></Box>
  <Box component="span" sx={{ display: 'inline' }}>courriel: </Box>
  <Box component="span" sx={{ display: 'inline' }}>{localStorage.getItem(storageemail)}</Box>

    </>





    )}

export default Me;