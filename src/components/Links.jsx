import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Wine Cellar
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/wine/list" className="nav-link">
                                Cellar List
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/wine/create" className="nav-link">
                                Add Wine
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links