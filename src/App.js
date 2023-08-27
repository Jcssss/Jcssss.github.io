import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';

const App = () => {
    const [page, setPage] = useState('About');

    const changePage = (pageName) => {
        setPage(pageName);
    }

    return (
        <div> 
            <Navigation curPage={page} onClick={changePage}/>
            <Main page={page} />
        </div>
    );
}

export default App;
