import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './Main/Main';
import Race from './Race/Race';
import Settings from './Settings/Settings';

class ViewManager extends Component {
    static Views() {
        return {
            Main: <Main />,
            Race: <Race />,
            Settings: <Settings />
        }
    }

    static View(props) {
        const name = props.location.search.substr(1);
        const view = ViewManager.Views()[name];
        if (view === null) throw new Error(`View ${name} is undefined`);
        return view;
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path='/' component={ViewManager.View} />
                </div>
            </Router>
        );
    }
}

export default ViewManager;