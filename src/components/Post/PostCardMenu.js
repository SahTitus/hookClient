import { ListItem, ListItemIcon, ListItemText, List } from "@mui/material";
import { BlockOutlined, BookmarkBorder, Clear, LinkOutlined, ReportOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useStateContex } from "../../store/StateProvider";
import { useDispatch } from "react-redux";
import { deletePst} from "../../actions/posts";

function PostCardMenu({id}) {
  const { darkMode } = useStateContex();
  const dispatch = useDispatch();
  
  return (
    <List style={{backgroundColor: darkMode ? '#242526' : 'white'}}>
      <ListItem button onClick={() => dispatch(deletePst(id))} style={{color: darkMode ? 'white' : ''}}>
        <ListItemIcon style={{color: darkMode ? '#fff' : ''}}>
          <Clear style={{stroke: darkMode ? '#242526' : 'white'}}/>
        </ListItemIcon>
        <ListItemText>Hide post</ListItemText>
      </ListItem>
      

      <ListItem button style={{color: darkMode ? 'white' : ''}}>
        <ListItemIcon style={{color: darkMode ? '#fff' : ''}}>
          <BookmarkBorder style={{stroke: darkMode ? '#242526' : 'white'}}/>
        </ListItemIcon>
        <ListItemText>Save</ListItemText>
      </ListItem>

      <ListItem button style={{color: darkMode ? 'white' : ''}}>
        <ListItemIcon style={{color: darkMode ? '#fff' : ''}}>
          <VisibilityOutlined style={{stroke: darkMode ? '#242526' : 'white'}}/>
        </ListItemIcon>
        <ListItemText>Follow</ListItemText>
      </ListItem>

      <ListItem button style={{color: darkMode ? 'white' : ''}}>
        <ListItemIcon style={{color: darkMode ? '#fff' : ''}}>
          <ReportOutlined style={{stroke: darkMode ? '#242526' : 'white'}}/>
        </ListItemIcon>
        <ListItemText>Report</ListItemText>
      </ListItem>

      <ListItem button style={{color: darkMode ? 'white' : ''}}>
        <ListItemIcon style={{color: darkMode ? '#fff' : ''}}>
          <BlockOutlined style={{stroke: darkMode ? '#242526' : 'white'}}/>
        </ListItemIcon>
        <ListItemText>Block account</ListItemText>
      </ListItem>

      <ListItem button style={{color: darkMode ? 'white' : ''}}>
        <ListItemIcon style={{color: darkMode ? '#fff' : ''}}>
          <LinkOutlined style={{stroke: darkMode ? '#242526' : 'white'}}/>
        </ListItemIcon>
        <ListItemText>Copy link</ListItemText>
      </ListItem>
    </List>
  );
}

export default PostCardMenu;
