import { useAuth } from '../auth';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [logged] = useAuth();

  return <Route {...rest} render={(props) => (
    logged?
      <Component {...props} />
      :
      <Redirect to='/login' />
  )} />
}

export default PrivateRoute;
