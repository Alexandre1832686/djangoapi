import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Rating
} from "@mui/material";

import IRating from "../../data_interfaces/IRating";

type RatingCardProps = {
  rating: IRating;
};

function RatingCard({ rating }: RatingCardProps): React.JSX.Element {
  console.log("RATING", rating);

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {rating.user_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary">
          {rating.commentaire}
        </Typography>
        <Typography variant="h5" component="div">
          <Rating
            name="simple-controlled"
            value={rating.ratingamount}
            readOnly={true}
          />
        </Typography>
      </CardContent>
      
    </Card>
  );
}

export default RatingCard;
