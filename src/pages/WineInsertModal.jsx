import React from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';

class WineInsertModal extends React.Component {
	constructor(props) {
	super(props);
	this.form = React.createRef();
	this.state={
		winery: '',
		wine_name: '',
		vintage: null,
		region: '',
		country: '',
		vivino_rating: null,
		user_rating: null,
		comments: '',
		price: null,
		alcohol_content: '',
		grapes: '',
		wine_style: '',
		inventory_count: 1,
		}
	}
	
	handleWineryChange = (event) => { this.setState({ winery: event.target.value }) }
	handleWineNameChange = (event) => { this.setState({ wine_name: event.target.value }) }
	handleVintageChange = (event) => { this.setState({ vintage: event.target.value }) }
	handleRegionChange = (event) => { this.setState({ region: event.target.value }) }
	handleCountryChange = (event) => { this.setState({ country: event.target.value }) }
	handleVivinoRatingChange = (event) => { this.setState({ vivino_rating: event.target.value }) }
	handleUserRatingChange = (event) => { this.setState({ user_rating: event.target.value }) }
	handleCommentsChange = (event) => { this.setState({ comments: event.target.value }) }
	handlePriceChange = (event) => { this.setState({ price: event.target.value }) }
	handleAlcoholContentChange = (event) => { this.setState({ alcohol_content: event.target.value }) }
	handleGrapesChange = (event) => { this.setState({ grapes: event.target.value }) }
	handleWineStyleChange = (event) => { this.setState({ wine_style: event.target.value }) }
	handleInventoryChange = (event) => { this.setState({ inventory_count: event.target.value }) }
	
	handleSubmit = async (e) => {
		e.preventDefault();
		await this.props.newWineHandler(this.state.winery, this.state.wine_name, this.state.vintage, this.state.region, this.state.country, this.state.vivino_rating, this.state.user_rating, this.state.comments, this.state.price, this.state.alcohol_content, this.state.grapes, this.state.wine_style, this.state.inventory_count);
		this.setState({winery: null, wine_name: null, vintage: null, region: null, country: null, vivino_rating: null, user_rating: null, comments: null, price: null, alcohol_content: null, grapes: null, wine_style: null, inventory_count: null});
	}
	
	render() {
	return(
		<Modal show={this.props.showModal} onHide={this.props.handleModalClose} centered={true}>
			<Form ref={form => this.form = form} onSubmit={this.handleSubmit}>
				<Modal.Header closeButton>
				<Modal.Title>Add New Wine</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Winery:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.winery} onChange={this.handleWineryChange} required />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Wine Name:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.wine_name} onChange={this.handleWineNameChange} required />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Vintage:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.vintage} onChange={this.handleVintageChange} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Region:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.region} onChange={this.handleRegionChange} required />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Country:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.country} onChange={this.handleCountryChange} required />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Vivino Rating:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.vivino_rating} onChange={this.handleVivinoRatingChange} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>User Rating:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.user_rating} onChange={this.handleUserRatingChange} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Comments:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.comments} onChange={this.handleCommentsChange} required />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Price:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.price} onChange={this.handlePriceChange} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Alcohol Content:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.alcohol_content} onChange={this.handleAlcoholContentChange}/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Grapes:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.grapes} onChange={this.handleGrapesChange} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Wine Style:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.wine_style} onChange={this.handleWineStyleChange} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm='4'>Count:</Form.Label>
						<Col sm='8'>
						<Form.Control value={this.state.inventory_count} onChange={this.handleInventoryChange} />
						</Col>
					</Form.Group>	
				</Modal.Body>
				<Modal.Footer>
					<Button variant='success' type='submit'>Add</Button>
					<Button variant='secondary' onClick={this.props.handleModalClose}>Cancel</Button>
				</Modal.Footer>
			</Form>
			</Modal>
	)
	
	
	}
	}

export default WineInsertModal;
