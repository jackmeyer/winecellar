import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'
//import BootstrapTable from 'react-bootstrap-table-next';
//import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//import { Row, Col, Container, Modal, Button } from 'react-bootstrap';

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateWine extends Component {
    updateWine = event => {
        event.preventDefault()

        window.location.href = `/wine/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateWine}>Update</Update>
    }
}

class DeleteWine extends Component {
    deleteWine = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the wine ${this.props.id} permanently?`,
            )
        ) {
            api.deleteWineById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteWine}>Delete</Delete>
    }
}

class WineList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wines: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllWines().then(wines => {
            this.setState({
                wines: wines.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { wines, isLoading } = this.state

        const columns = [
            {
                Header: 'Name',
                accessor: 'wine_name',
                filterable: true,
            },
            {
                Header: 'Winery',
                accessor: 'winery',
                filterable: true,
            },
            {
                Header: 'Vintage',
                accessor: 'vintage',
                filterable: true,
            },
            {
                Header: 'Region',
                accessor: 'region',
                filterable: true,
            },
            {
                Header: 'Country',
                accessor: 'country',
                filterable: true,
            },
            {
                Header: 'User Rating',
                accessor: 'user_rating',
                filterable: true,
            },
            {
                Header: 'Price',
                accessor: 'price',
                filterable: true,
            },
            {
                Header: 'ABV %',
                accessor: 'alcohol_content',
                filterable: true,
            },
            {
                Header: 'Stock',
                accessor: 'inventory_count',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteWine id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateWine id={props.original._id} />
                        </span>
                    )
                },
            }
        ]

        let showTable = true
        if (!wines.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={wines}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                        sortable={true}

                    />
                )}
            </Wrapper>
        )
    }
}

export default WineList