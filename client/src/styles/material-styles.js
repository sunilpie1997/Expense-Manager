import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  action_button: {
    margin:"1em"
  },

  text:{
      color:'#002884',
      padding:'0.5em',
      fontWeight:'400'
  },

  login_box : {
    marginTop:'5em',
    minHeight:'500px',
  },

  intro_box:{

    margin:'2em 0em',
    width:'50%',
    float:'left',
    minHeight:'100px',
    display:'flex',
    flexDirection:'column',
    alignContent:'center',
  },

  table_margin :{

    margin: '2em auto',
    maxWidth:'1000px',
    minWidth:'1000px'
  },

  report_table :{
    maxWidth:'300px',
    minWidth:'300px',
    margin: 'auto'
  },

  report_table_box: {
    margin:'2em 0em',
    width:'50%',
    float:'left',
    minHeight:'100px',
    display:'flex',
    flexDirection:'column',
    alignContent:'center',
  },

  nav_item: {
    margin: '0em 1em',
    color: "white",
    textDecoration:'none'
  },

  box_margin:{
    marginTop:'2em',
  },
  error_text:{
    color:"#E40017"
  }
    
});

export { useStyles};