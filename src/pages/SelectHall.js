import { Close, Search } from "@mui/icons-material";
import { Dialog, FormControl, IconButton, MenuItem, OutlinedInput, Select, Slide } from '@mui/material';
import React, { forwardRef, useState } from 'react'
// import useInput from "../utilities/useInput";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  // const halls = [
  //     "Food Planning",
  //     "Coding",
  //     "Motivational Zone",
  //     "Scientists",
  //     "Physics",
  //     "Computer Science",
  //     "Leadership",
  //     "Archaeology",
  //     "Health Premises",
  //     "Programming",
  //     "Food Planning",
  //     "Coding",
  //     "Motivational Zone",
  //     "Scientists",
  //     "Physics",
  //     "Computer Science",
  //     "Leadership",
  //     "Archaeology",
  //     "Health Premises",
  //     "Programming",
  // ];

function SelectHall() {
    const [openHallList, setOpenHallList] = useState(false);

    // const { ...hallName } = useInput("");
    // const { ...whoSee } = useInput("");
    // const [selectedHall, setSelectedHall] = useState('Halls')

    // console.log(hallName.value)
  
    // const handleOpenHallList = () => {
    //   setOpenHallList(true);
    // };
  
    const handleClose = () => {
      setOpenHallList(false);
    };

  return (
    <div>
        <FormControl id="appPost__whoSeeFormCtrl" sx={{ m: 1, width: 300 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="appPost__select"
              input={<OutlinedInput />}
              // {...whoSee}
              MenuProps={MenuProps}
            >
              <MenuItem value="Public">Public</MenuItem>
              {/* <MenuItem value='Halls' onClick={handleOpenHallList}>Hall</MenuItem> */}
              
            </Select>
          </FormControl>

 <Dialog
        fullScreen
        open={openHallList}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="select__hallTop">
          <div className="select__hallSearch">
            <form className="select__hallSearchContainer">
              <Search className="select__hallSearchIcon" />
              <input type="text" placeholder="Search halls..." />
            </form>
          </div>
          <IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							style={{ margin: "0 5px" }}>
							<Close style={{color: 'gray'}}/>
						</IconButton>
        </div>

        {/* <div className="select__hallList">
								{halls.map((hall, index) => (
									<MenuItem
                  {...hallName}
                  onClick={handleClose}
                   key={hall + index} >
										{hall}
									</MenuItem>
								))}
        </div> */}
      </Dialog>
    </div>
  )
}

export default SelectHall