
import IUser from "../../data_interfaces/IUser";
import AccountDS from "../../data_services/AccountDS";
import React, { useEffect, useState} from "react";
import { storageUsername, storageemail, storagefirstname, storagelastname } from "../../data_services/CustomAxios";
import { Box, Typography } from "@mui/material";



function Me(): React.JSX.Element {

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    AccountDS.get()
      .then((response) => {
        console.log("user loaded", response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while category loading",
          err,
          err.response
        );
      });
  }, []);

  return (

<>
  <Typography component="h1" variant="h5">
    Informations
  </Typography>    
  <Box component="span" sx={{ display: 'inline' }}>prenom: </Box>
  <Box component="span" sx={{ display: 'inline' }}>{user?.first_name}</Box>
  <Box component="span" sx={{ display: 'block' }}></Box>
  <Box component="span" sx={{ display: 'inline' }}>nom: </Box>
  <Box component="span" sx={{ display: 'inline' }}>{user?.last_name}</Box>
  <Box component="span" sx={{ display: 'block' }}></Box>
  <Box component="span" sx={{ display: 'inline' }}>courriel: </Box>
  <Box component="span" sx={{ display: 'inline' }}>{user?.email}</Box>
  </>

    )}

export default Me;