import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  button: {
    width: 'auto'
  },
  user: {
    marginRight: 20
  },
  buttonContainer: {
    width: 'auto'
  },
  icon: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default useStyles;
