import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flex: 1,
    height: 400,
    marginRight: 10,
    marginLeft: 10,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  title: {
    fontSize: 14
  },
  container: {
    display: 'flex',
    padding: 50,
    width: '100%',
    minHeight: '100vh',
    background:
      'radial-gradient(ellipse at left bottom,rgba(22, 24, 47, 1) 0%,rgba(38, 20, 72, 0.9) 59%,rgba(17, 27, 75, 0.9) 100%)'
  }
});

export default useStyles;
