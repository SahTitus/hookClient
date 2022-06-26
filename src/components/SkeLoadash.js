import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { useStateContex } from "../store/StateProvider";

function SkeLoadash() {
  const { darkMode } = useStateContex();

  return (
    <Card 
    className={` ${darkMode && 'skeleDark'}`}
    sx={{ maxWidth: '100%', marginBottom: '3px'}}
    style={{bgcolor: darkMode? '#000' : ''}}
    >
      <CardHeader
     
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
            className={` ${darkMode && 'skeleDarkAnimat'}`}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="70%"
            style={{ marginBottom: 6 }}
            className={` ${darkMode && 'skeleDarkAnimat'}`}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" className={` ${darkMode && 'skeleDarkAnimat'}`}/>}
      />
      <Skeleton sx={{ height: 120 }} animation="wave" variant="rectangular" className={` ${darkMode && 'skeleDarkAnimat'}`}/>

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} className={` ${darkMode && 'skeleDarkAnimat'}`}/>
          <Skeleton animation="wave" height={10} width="80%" className={` ${darkMode && 'skeleDarkAnimat'}`}/>
        </React.Fragment>
      </CardContent>
    </Card>
  );
}

export default SkeLoadash;
