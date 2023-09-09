import react from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './Contact';

const App = () => {



const defaultTheme = 'dark';

const restartAnimation = () => {
	let title = document.getElementById('title');
	title.classList.remove('title-animation-run');
	void title.offsetWidth;
	title.classList.add('title-animation-run');
}

return (

<div>	

	<div id='title-container'>
		<h1 id='title' className='title-animation-run' onClick={restartAnimation}>Pomodoro Timer</h1>
	</div>
	
	<BrowserRouter>	
		<Routes>
			<Route path='/' element={<Home theme={defaultTheme}/>}/>
			<Route path='/contact' element={<Contact/>}/>
		</Routes>
	</BrowserRouter>
</div>
);
}

export default App;
