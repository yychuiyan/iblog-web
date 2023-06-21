import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LayoutIndex from '@/pages/layout';
const Routes = () => {
  return (
    <div>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Switch>
            <Route path="/" render={() => <LayoutIndex />}></Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default Routes;
