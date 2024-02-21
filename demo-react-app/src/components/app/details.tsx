import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography,Box,Button, Hidden } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavigateFunction, useNavigate } from "react-router-dom";
import RatingDS from "../../data_services/RatingDS";
import IRating from "../../data_interfaces/IRating";
import RatingCard from "./RatingCard";
import IProduct from "../../data_interfaces/IProduct";
import IUser from "../../data_interfaces/IUser";
import ProductDS from "../../data_services/ProductDS";
import Evaluation from "./Evaluation";
import AccountDS from "../../data_services/AccountDS";
import { Note } from "@mui/icons-material";

function DetailProduit(): React.JSX.Element {
  const [produit, SetProduct] = useState<IProduct>();
  const [rating, SetRating] = useState<IRating[]>([]);
  const [moyenne, SetMoyenne] = useState<number>();
  const { id = "0" } = useParams();
  const prodid: number = parseInt(id, 10);
  const navigate: NavigateFunction = useNavigate();
  const handleClickOpen = () => {
    navigate(`/product/${prodid}/evaluation`);
  };

  var x =0

  const [user, setUser] = useState<IUser | null>(null);
  const [note, setNote] = useState<number | 0>(0);
  const [boutonText, setBoutonText] = useState<string | "Envoyer l'évaluation">("Envoyer l'évaluation");



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

    AccountDS.get()
    .then((response) => {
      console.log("user loaded", response.data);
      setUser(response.data);
      var test = response.data
      RatingDS.getAll(prodid)
      .then((response) => {
        console.log("Rating loaded", response.data);
        SetRating(response.data)
        for (let i = 0; i < response.data.length; i++) {
          x+=response.data[i].ratingamount
          
          if(response.data[i].user_name == (test.first_name + ' ' +test.last_name))
          {
            setNote(response.data[i].id)
            setBoutonText("Modifier l'évalation")
          }
          else{
            setNote(0)
            setBoutonText("Envoyer l'évalation")
          }
        }
        SetMoyenne(x/response.data.length)
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while product loading",
          err,
          err.response
        );
      });
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
      <Box component="span" sx={{ display: 'block' }}></Box>
      <Box component="span" sx={{ display: 'inline' }}>Note moyenne: </Box>
      <Box component="span" sx={{ display: 'inline' }}>{moyenne?.toString()}</Box>
      
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

    <Evaluation idNote={note} TextBouton={boutonText}></Evaluation>
  </>
  

  );
  
}

export default DetailProduit;
