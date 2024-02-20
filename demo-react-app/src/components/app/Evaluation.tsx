import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  Grid,
  HiddenProps,
  IconButton,
  InputAdornment,
  Rating,
  Link,
  Typography,
  Hidden,
  TextField
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

import FormTextField from "../controls/FormTextField";
import RatingDS from "../../data_services/RatingDS";
import IRating from "../../data_interfaces/IRating";



const formSchema = yup.object().shape({
    commentaire: yup
      .string()
      .default("")
      .required()
      .max(200, "Le commentaire doit contenir au plus 200 caractères"),
  });


  
type FormRatingFields = {
    
    commentaire: string;
  };




  

function Evaluation(): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { id = "0" } = useParams();
    const prodid: number = parseInt(id, 10);

    const [ratingValue, setRatingValue] = useState<number>(0);

    const {
        formState: { errors },
        handleSubmit,
        register,
        
      } = useForm<FormRatingFields>({
        resolver: yupResolver(formSchema),
      });
    
    const handleFormSubmit = (data: FormRatingFields): void => {
        
        RatingDS.create(
          ratingValue,
          data.commentaire,
          prodid
          
        )
          .then(() => {
            navigate("../");
          })
          .catch((err) => {
            console.log(
              "ERROR: An error occurred during sign in",
              err,
              err.response
            );
          });
      };


return (
    <>
    <Typography component="h1" variant="h5">
      Laisser un commentaire
    </Typography>
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ mt: 1, width: "100%" }}
    >
      <FormTextField
        
        autoFocus
        
        label={"Commentaire"}
        margin="normal"
        registerReturn={register("commentaire")}
      />
     
     <Rating
        name="simple-controlled"
        onChange={(event, newValue) => {
          setRatingValue(newValue !== null ? newValue : 0)
        }}
      />

      <Button
        color="primary"
        fullWidth
        sx={{ mb: 2, mt: 3 }}
        type="submit"
        variant="contained"
      >
        Envoyer l'évaluation
      </Button>
      
    </Box>
  </>
)
}
export default Evaluation;