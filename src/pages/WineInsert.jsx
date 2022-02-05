import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class WineInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winery: '',
            wine_name: '',
            vintage: 0,
            region: '',
            country: "",
            user_rating: 0,
            comments: "",
            price: "",
            alcohol_content: "",
            inventory_count: 0
        }
    }

    handleChangeInputWinery = async event => {
        const winery = event.target.value
        this.setState({ winery })
    }

    handleChangeInputWineName = async event => {
        const wine_name = event.target.value
        this.setState({ wine_name })
    }

    handleChangeInputVintage = async event => {
        const vintage = event.target.value
        this.setState({ vintage })
    }

    handleChangeInputRegion = async event => {
        const region = event.target.value
        this.setState({ region })
    }

    handleChangeInputCountry = async event => {
        const country = event.target.value
        this.setState({ country })
    }

    handleChangeInputRating = async event => {
        const user_rating = event.target.value
        this.setState({ user_rating })
    }

    handleChangeInputComments = async event => {
        const comments = event.target.value
        this.setState({ comments })
    }

    handleChangeInputPrice = async event => {
        const price = event.target.value
        this.setState({ price })
    }

    handleChangeInputAlcoholContent = async event => {
        const alcohol_content = event.target.value
        this.setState({ alcohol_content })
    }

    handleChangeInputCount = async event => {
        const inventory_count = event.target.value
        this.setState({ inventory_count })
    }

    handleIncludeWine = async () => {
        const { winery, wine_name, vintage, region, country, user_rating, comments, price, alcohol_content, inventory_count } = this.state
        const payload = { winery, wine_name, vintage, region, country, user_rating, comments, price, alcohol_content, inventory_count }

        await api.insertWine(payload).then(res => {
            window.alert(`Wine added successfully`)
            this.setState({
                winery: '',
                wine_name: '',
                vintage: '',
                region: '',
                country: '',
                user_rating: '',
                comments: '',
                price: '',
                alcohol_content: '',
                inventory_count: ''
            })
        })
    }

    render() {
        const { winery, wine_name, vintage, region, country, user_rating, comments, price, alcohol_content, inventory_count } = this.state
        return (
            <Wrapper>
                <Title>Add Wine</Title>

                <Label>Winery: </Label>
                <InputText
                    type="text"
                    value={winery}
                    onChange={this.handleChangeInputWinery}
                />

                <Label>Wine Name: </Label>
                <InputText
                    type="text"
                    value={wine_name}
                    onChange={this.handleChangeInputWineName}
                />

                <Label>Vintage: </Label>
                <InputText
                    type="number"
                    step="1"
                    min="1900"
                    value={vintage}
                    onChange={this.handleChangeInputVintage}
                />

                <Label>Region: </Label>
                <InputText
                    type="text"
                    value={region}
                    onChange={this.handleChangeInputRegion}
                />

                <Label>Country: </Label>
                <InputText
                    type="text"
                    value={country}
                    onChange={this.handleChangeInputCountry}
                />

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    min="1900"
                    value={user_rating}
                    onChange={this.handleChangeInputRating}
                />

                <Label>Comments: </Label>
                <InputText
                    type="text"
                    value={comments}
                    onChange={this.handleChangeInputComments}
                />

                <Label>Price: </Label>
                <InputText
                    type="text"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />

                <Label>Alcohol Content: </Label>
                <InputText
                    type="text"
                    value={alcohol_content}
                    onChange={this.handleChangeInputAlcoholContent}
                />

                <Label>How many?: </Label>
                <InputText
                    type="number"
                    value={inventory_count}
                    onChange={this.handleChangeInputCount}
                />

                <Button onClick={this.handleIncludeWine}>Add Wine</Button>
                <CancelButton href={'/wine/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default WineInsert