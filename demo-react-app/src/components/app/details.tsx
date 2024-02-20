import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography,Box,Button, Hidden } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavigateFunction, useNavigate } from "react-router-dom";
import RatingDS from "../../data_services/RatingDS";
import IRating from "../../data_interfaces/IRating";
import RatingCard from "./RatingCard";
import IProduct from "../../data_interfaces/IProduct";
import ProductDS from "../../data_services/ProductDS";

function DetailProduit(): React.JSX.Element {
  const [produit, SetProduct] = useState<IProduct>();
  const [rating, SetRating] = useState<IRating[]>([]);
  const { id = "0" } = useParams();
  const prodid: number = parseInt(id, 10);
  const navigate: NavigateFunction = useNavigate();
  const handleClickOpen = () => {
    navigate(`/product/${prodid}/evaluation`);
  };


  useEffect(() => {
    ProductDS.get(prodid)
      .then((response) => {
        console.log("Product loaded", response.data);
        SetProduct(response.data);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while product loading",
          err,
          err.response
        );
      });

    RatingDS.getAll(prodid)
      .then((response) => {
        console.log("Rating loaded", response.data);
        SetRating(response.data);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while product loading",
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
      <Box component="span" sx={{ display: 'block' }}></Box>
      <Box component="span" sx={{ display: 'inline' }}>Code: </Box>
      <Box component="span" sx={{ display: 'inline' }}>{produit?.code}</Box>
      <Box component="span" sx={{ display: 'block' }}></Box>
      <Box component="span" sx={{ display: 'inline' }}>Nom: </Box>
      <Box component="span" sx={{ display: 'inline' }}>{produit?.name}</Box>
      <Box component="span" sx={{ display: 'block' }}></Box>
      <Box component="span" sx={{ display: 'inline' }}>Description: </Box>
      <Box component="span" sx={{ display: 'inline' }}>{produit?.description}</Box>
      <Box component="span" sx={{ display: 'block' }}></Box>
      <Box component="span" sx={{ display: 'inline' }}>Catégorie: </Box>
      <Box component="span" sx={{ display: 'inline' }}>{produit?.category}</Box>
      
      <Typography component="h1" variant="h5" marginTop={5}>
        Évaluations
      </Typography>
      
      <Grid container spacing={2}>
      {rating.map((rating) => (
        <Grid key={`rating-${rating.id}`} item xs={12} sm={6} lg={4}>
          <RatingCard rating={rating} />
          
        </Grid>
      ))}
    </Grid>
        <Button sx={{marginTop: 4}}variant="contained" onClick={handleClickOpen}>Ajouter une évaluation</Button>

  </>

   
  );
}

export default DetailProduit;
