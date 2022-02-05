import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { WineList, WineInsert, WineUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" exact element={<WineList />} />
                <Route path="/wine/list" exact element={<WineList />} />
                <Route path="/wine/create" exact element={<WineInsert />} />
                <Route
                    path="/wine/update/:id"
                    exact
                    element={<WineUpdate />}
                />
            </Routes>
        </Router>
    )
}

export default App