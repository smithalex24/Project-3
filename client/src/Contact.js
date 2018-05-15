import React, { Component } from 'react';
import axios from 'axios';


class Contact extends Component {
 	constructor(props){
 		super(props)
 		this.state={
 			userData: null
 		}
 	}

 	componentDidMount(){
 		axios.get(`http://localhost:3001/profile/${this.props.user.id}`)
		.then(res => {
			const savedContact = res.data;
			console.log('this is res data: ', res.data)
			this.setState({
				userData: res.data
			})	
		})
	.catch(err => {
		console.log('ERROR', err);
	});
 	}

	removeMentor = (e) => {
		e.preventDefault();
		console.log(e.target.dataset.stuff)
		axios.delete(`http://localhost:3001/profile/${this.props.user.id}/${e.target.dataset.stuff}`)
		.then(data => {
			
		})
	}

	render () {
		if(this.state.userData){
			var savedMentors = this.state.userData.savedMentors.map((people, i) => {
				var key = i
				console.log(people.Mentor)
				return (
					<div className='row' key={key}>
					<div className='col s12'>
						<form>
							<p>Mentor: {people.Mentor}</p>
							<p>Contact: {people.Contact}</p>
							<p>Location: {people.Location}</p>
						</form>
					</div>
					<div className='col s12'>
						<button type='button' data-stuff={people._id} onClick={this.removeMentor}>Delete Mentor</button>
					</div>
						<hr />
					</div>

				)
			})
			console.log(savedMentors)
		} else {
			var savedMentors = ""
		}

		return (
			<div>
				
				<div>
					{savedMentors}
				</div>
			</div>
			
		)
	}
	


}


export default Contact;


