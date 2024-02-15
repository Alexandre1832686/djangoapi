import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

import FormTextField from "../controls/FormTextField";
import RatingDS from "../../data_services/RatingDS";



const formSchema = yup.object().shape({
    commentaire: yup
      .string()
      .default("")
      .required()
      .max(200, "Le commentaire doit contenir au plus 200 caractères"),
    ratingamount: yup.number().default(0),
    product: yup.number().required().default(0),
    user: yup.number().required().default(1)
    
  });


  
type FormRatingFields = {
    user: number
    ratingamount: number;
    commentaire: string;
    product: number
  };




  

function Evaluation(): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    
    const {
        formState: { errors },
        handleSubmit,
        register,
        
      } = useForm<FormRatingFields>({
        resolver: yupResolver(formSchema),
      });
    
    const handleFormSubmit = (data: FormRatingFields): void => {
        
        RatingDS.create(data.user, data.ratingamount, data.commentaire, data.product)
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