import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {
  Router,
  IndexRoute,
  Route,
  browserHistory
} from 'react-router';
import {Provider} from 'react-redux';
import './index.css';
import store from './store/index';
import '../node_modules/antd/dist/antd.css';
import moderate from './components/moderate';
import navBar from './components/navBar';
import table from './components/table';
import user from './components/user';


ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <Router history={browserHistory}>
              <Route path="/" component={navBar}>
                <IndexRoute component={table} />
                <Route path="moderate" component={moderate} />
                <Route path="user/:id" component={user} />
              </Route>
            </Router>

        </Provider>
    </LocaleProvider>
  , document.getElementById('root'));
