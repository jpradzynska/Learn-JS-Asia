import React from 'react';
import RecipesList from '../components/RecipesList';

class App extends React.Component {
    render() {
        return (
            <div>
                <div id="mainImg">
                    <img src={ require('../images/banner.jpg') }/>
                </div>
                <RecipesList />
            </div>
        )
    }
}

export default App;
