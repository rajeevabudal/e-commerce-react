import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import "./card.css";
export default function ImgMediaCard({
  imageUrl,
  title,
  description,
  handleEdit,
  handleDelete,
  price,
  handleBuy,
}) {
  const loginData = useSelector((state) => state.login.signInData);
  console.log(loginData);
  return (
    <Card sx={{ maxWidth: 345 }} className="card-overview">
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
      />
      <CardContent className="card-content">
        <div className="card-title-price">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Rs : {price}
          </Typography>
        </div>
        <div className="card-description">
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={handleBuy}>
          BUY
        </Button>
        <div className="card-edit-delete">
          {loginData.role[0].authority === "ADMIN" && (
            <>
              <Button size="small">
                <EditIcon onClick={handleEdit} />
              </Button>
              <Button size="small">
                <DeleteIcon onClick={handleDelete} />
              </Button>
            </>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
