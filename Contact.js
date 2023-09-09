import react from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Contact = () => {

return (
	<div className='contactpage'>
		
		<br/>
		<Link to='/' className="contactHomeLink">Home</Link>
		<h1 className='contactTitle'>Contact</h1>

		<form action='https://formsubmit.co/254a2fa812817b545d2a2bb4e7796c0e' method="POST">
			<TextField autoComplete='off' id="email-input" type='email' name='email' label="example@example.com" variant="filled" required/>
			<br/>	
			<textarea required placeholder='Message...' id='message-input' name='message' type='text'></textarea>		
			<br/>
			<Button variant="contained" type='submit'>Submit</Button>
			<input type="hidden" name="_next" value="https://timerpomo.web.app/"/>
			<input type="hidden" name="_captcha" value="false"/>
			<input type="hidden" name="_autoresponse" value="Thank you for your response!"/>
			<input type="hidden" name="_subject" value="New submission!"/>

		</form>
	</div>
);

}

export default Contact;
