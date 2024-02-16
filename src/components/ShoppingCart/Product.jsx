import {
  Box,
  Card,
  Typography,
} from "@mui/material";
import React from "react"

export const Product = ({name,description,price}) => {
  return (
    <Card>
              <Box padding={2}>
                <Typography component="h4" variant="h4">
                  {name}
                </Typography>
                <Typography variant="body1" component="h6" >
                 {description}
                </Typography>
                <Typography variant="h6" component="h6" >
                  Price : {price} $
                </Typography>
                </Box>
              </Card>
             
  )
}
