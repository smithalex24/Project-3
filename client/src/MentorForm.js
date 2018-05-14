import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Search from './Search';
import { Collapsible, CollapsibleItem, Input } from 'react-materialize'

const medicine =['Dentistry', 'Gyno', 'Pediatrics']

const arts = ['Photography', 'Animation', 'Sculpture', 'Illustration', 'Theatre']
const law = ['Attorney', 'Prosecutor', 'Public Defender', 'Private Practice']
const tech = ['Web Developer', 'Data Scientist', 'UX Designer', 'Project Manager']
const education = ['Teacher', 'Special Education Teacher']

class MentorForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			field: [],
			experience: '',
			display: false
		};
	}
	
  
	fieldChange = (e) => {
		const newField = this.state.field
		let index
		// this.setState({field: newField});
		if (e.target.checked) {
			newField.push(e.target.value)
		} else {
			index = newField.indexOf(e.target.value)
			newField.splice(index, 1)
		}
		this.setState({ field: newField})
	}
	
	experienceChange = (e) => {
		// console.log(e.target.value)
		this.setState({ experience: e.target.value });
	}



	formSubmit = (e) => {
		e.preventDefault();
		console.log("Mentor form created!", this.state);
		console.log('user is', this.props.user);
		// this.state.field.push(this.state.field);
		axios.post('http://localhost:3001/mentor', {
			userId: this.props.user.id, 
			// field: ['something here'],
			field: this.state.field,
			experience: this.state.experience
		})
		.then(result => {
			console.log(result)
			this.setState({ 
				field: result.data.field,
				experience: result.data.experience,
				display: true
			}, () => 
				console.log(this.state)
			);

			console.log(result)
			console.log('Yay, it worked!', result);
		})
		.then()
		.catch(err => {
			console.log('ERROR', err);
		});

	}

render() {

var fieldMap = this.state.field.map((item,index) => 
	<li>{ item }</li>
)

if (this.state.display === true) {
	var newDisplay = ( 
		<div>
			<ul className='browser-default'>
			<h4>Your fields:{fieldMap} </h4>
			</ul>
			<p>{this.state.experience}</p>
		</div>
		)
	} else {
		var newDisplay = (
			<div></div>
		)
	}
	
var medicineMap = medicine.map((item,index) =>
     <div className='list-container'>
       <li key={index} className='fieldList col s12'>
        <Input name='field' type='checkbox' value= {item} label= {item} className='filled-in style-checkbox input-check' onChange={this.fieldChange} />
       </li>
       <br />
      </div>)
var artMap = arts.map((item,index) =>
     <div className='list-container'>
       <li key={index} className='fieldList col s12'>
        <Input name='field' type='checkbox' value= {item} label= {item} className='filled-in style-checkbox input-check' onChange={this.fieldChange} />
       </li>
       <br />
      </div>)
var lawMap = law.map((item,index) =>
     <div className='list-container'>
       <li key={index} className='fieldList col s12'>
        <Input name='field' type='checkbox' value= {item} label= {item} className='filled-in style-checkbox input-check' onChange={this.fieldChange} />
       </li>
       <br />
      </div>)
var techMap = tech.map((item,index) =>
     <div className='list-container'>
       <li key={index} className='fieldList col s12'>
        <Input name='field' type='checkbox' value= {item} label= {item} className='filled-in style-checkbox input-check' onChange={this.fieldChange} />
       </li>
       <br />
      </div>)
var educationMap = education.map((item,index) =>
     <div className='list-container'>
       <li key={index} className='fieldList col s12'>
        <Input name='field' type='checkbox' value= {item} label= {item} className='filled-in style-checkbox input-check' onChange={this.fieldChange} />
       </li>
       <br />
      </div>)



		return (
			<div className= "mentor-form row">
				<form onSubmit = {this.formSubmit}>	
					<div className="col s6">
					<h4>Pick your Areas of Expertise</h4>
						<Collapsible accordion name="Field" >
						  <CollapsibleItem header='Medicine' icon='arrow_drop_down_circle'>
						  	<ul>{medicineMap}</ul>
						  </CollapsibleItem>
						  <CollapsibleItem header="Art" icon='arrow_drop_down_circle'>
						  <ul><li>{artMap}</li></ul>
						  </CollapsibleItem>
						  <CollapsibleItem header="Law" icon='arrow_drop_down_circle'>
						   <ul><li>{lawMap}</li></ul>
						  </CollapsibleItem>
						<CollapsibleItem header="Tech" icon='arrow_drop_down_circle'>
						   <ul><li>{techMap}</li></ul>
						  </CollapsibleItem>
						  <CollapsibleItem header="Education" icon='arrow_drop_down_circle'>
						   <ul><li>{educationMap}</li></ul>
						  </CollapsibleItem>
						</Collapsible>
						<input className= "input" name = "Experience" placeholder= "Enter short bio here" value = {this.state.experience} onChange = { this.experienceChange } />
					
						<input type = "submit" value = "Submit" className = "button" />
					</div>
				</form>
				<div className='new-display col s6'>
					<h5>Hello again, {this.props.user.name}!</h5>
					<h5>Your email is {this.props.user.email}</h5>
					<h5>Your bio: {newDisplay}</h5>
			</div>		
		</div>
    );
  }
}




export default MentorForm;
