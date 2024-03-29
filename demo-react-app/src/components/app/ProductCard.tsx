import React, { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { storageAccessToken } from "../../data_services/CustomAxios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSnackbar } from "notistack";

import FavoriteContext, { IFavoriteContext } from "../FavoriteContext";
import FavoriteProductDS from "../../data_services/FavoriteProductDS";
import IProduct from "../../data_interfaces/IProduct";

type ProductCardProps = {
  product: IProduct;
};

function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const favoriteContext: IFavoriteContext = useContext(FavoriteContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleEditClick = () => {
    navigate(`/product/edit/${product.id}`);
  };

  const handleAddToFavoritesClick = () => {
    FavoriteProductDS.addMyFavoriteProducts(product.id)
      .then((response) => {
        console.log("Favorite product added", response.data);
        favoriteContext.add(product.id);
        enqueueSnackbar(
          `Le produit "${product.name}" a été ajouté à vos favoris.`,
          { variant: "success" }
        );
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while favorite product creating",
          err,
          err.response
        );
      });
  };

  const handleDetailsClick = (): void => {
    navigate(`/product/${product.id}`);
  };

  const handleRemoveFromFavoritesClick = () => {
    FavoriteProductDS.removeMyFavoriteProducts(product.id)
      .then((response) => {
        console.log("Favorite product removed");
        favoriteContext.remove(product.id);
        enqueueSnackbar(
          `Le produit "${product.name}" a été retiré de vos favoris.`,
          { variant: "success" }
        );
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while favorite product removing",
          err,
          err.response
        );
      });
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {product.code}
        </Typography>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleEditClick} size="small">
          Éditer
        </Button>
        {localStorage.getItem(storageAccessToken) && (
          <Tooltip
            title={
              favoriteContext.contains(product.id)
                ? "Enlever de vos favoris"
                : "Ajouter à vos favoris"
            }
          >
            <IconButton
              color="inherit"
              onClick={
                favoriteContext.contains(product.id)
                  ? handleRemoveFromFavoritesClick
                  : handleAddToFavoritesClick
              }
              sx={{ p: 0 }}
            >
              {favoriteContext.contains(product.id) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
          
        )}
        <Button onClick={handleDetailsClick} size="small">
          Détails
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
