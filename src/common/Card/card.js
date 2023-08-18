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
export default function ImgMediaCard({ imageUrl, title, description }) {
  const loginData = useSelector((state) => state.login.signInData);
  console.log(loginData)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">BUY</Button>
        {loginData.role[0].authority === "ADMIN" && 
          <>
            <Button size="small">
              <EditIcon />
            </Button>
            <Button size="small">
              <DeleteIcon />
            </Button>
          </>
        }
      </CardActions>
    </Card>
  );
}
