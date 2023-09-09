import { useEffect, useState } from 'react';
import './App.css';
import WorkTimer from './WorkTimer';
import {BsMoonFill} from 'react-icons/bs';
import {BsSunFill} from 'react-icons/bs';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Offcanvas } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ToolTip from 'react-bootstrap/ToolTip';
import {Link} from 'react-router-dom';

const Home = () => {
  
const [settingsShow,setSettingsShow] = useState(false);

const handleSettingsShow = () => setSettingsShow(true);
const handleSettingsClose = () => setSettingsShow(false);

//default dark theme
const [selectedTheme,setSelectedTheme] = useState('dark');

const handleContactPageChange = () => {

	document.body.style.backgroundColor = '#1f2020';
    document.getElementById('title').style.color = '#b4b8b7';
    document.getElementById('settingsButton').style.color = '#b4b8b7';

}

	return (
<div id='container'>
    <WorkTimer theme={selectedTheme}/>
  
  <OverlayTrigger placement="left" delay={{show:100,hide:100}} overlay={<ToolTip>Click to change theme!</ToolTip>}>
    <button id='settingsButton' onClick={handleSettingsShow}><GiHamburgerMenu/></button>
	</OverlayTrigger>

  <Offcanvas show={settingsShow} onHide={handleSettingsClose} placement='end' className="offCanvas">
  <Offcanvas.Header closeButton>
      <Offcanvas.Title className='offCanvasTitle'>Select Theme</Offcanvas.Title>   
  </Offcanvas.Header>

  <Offcanvas.Body>

    <form className='selectThemeForm' 
    onChange={(event) => {
        setSelectedTheme(event.target.value);
        if (event.target.value === "dark" ) {
            console.log('dark')
            document.body.style.backgroundColor = '#1f2020';
            document.getElementById('title').style.color = '#b4b8b7';
            document.getElementById('settingsButton').style.color = '#b4b8b7';
        }
        else if (event.target.value === 'light' ) {
          console.log('light')
          document.body.style.backgroundColor = '#f2f4f7';  
          document.getElementById('title').style.color = '#343c49';
          document.getElementById('settingsButton').style.color = '#343c49'; 
        }
		else if ( event.target.value === 'gudetama' ) {
			console.log('gudetama');
//			document.body.style.backgroundColor = '#f2f4f7';
			document.body.style.backgroundColor = '#fffff0';
			document.getElementById('title').style.color = '#db9221';
			document.getElementById('settingsButton').style.color = '#db9221';
		}
        else if (event.target.value === 'kuromi') {
          console.log('kuromi');
//		  document.body.style.backgroundColor = '#1f2020';
		  document.body.style.backgroundColor = '#2b2928';
		  document.getElementById('title').style.color = '#c67ae0';
		  document.getElementById('settingsButton').style.color = '#c67ae0';
          
        }
        else if (event.target.value === 'keroppi') {
          console.log('keroppi');
		  document.body.style.backgroundColor = '#b5d83c';
		  document.getElementById('title').style.color = '#343c49';
		  document.getElementById('settingsButton').style.color = '#343c49';
        }
        else if (event.target.value === 'mymelody') {
          console.log('mymelody');
			document.body.style.backgroundColor = '#d17da4';
			document.getElementById('title').style.color = '#d8dbdf';
			document.getElementById('settingsButton').style.color = '#d8dbdf';
        }
		else if (event.target.value === 'picklerick') {
			document.body.style.backgroundColor = '#55742b';
			document.getElementById('title').style.color = '#edfcd1';
			document.getElementById('settingsButton').style.color = '#edfcd1';
		}

	}}>

      <label className='selectThemeIcon'>
        <input type="radio" name="theme" value="dark"/>
        <span><BsMoonFill color='#323636' id='darkButton'/></span>
      </label>

      <label className='selectThemeIcon'>
        <input type="radio" name="theme" value="light"/>
        <span><BsSunFill color='#edae0e' id='lightButton'/></span>
      </label>

      <label className='selectThemeImage'>
        <input type="radio" name="theme" value="gudetama"/>
        <span><img src="gudetama.png" width="50px" style={{paddingBottom:"20px"}}/></span>
      </label>
		
		<br/>

      <label className='selectThemeImage'>
        <input type="radio" name="theme" value="kuromi"/>
        <span><img src="kuromi.png" width="60px"/></span>
      </label>
		
	  <label className='selectThemeImage'>
		<input type="radio" name="theme" value="keroppi"/>
		<span><img src="keroppi.png" width="60px"/></span>
	</label>


	<label className="selectThemeImage">
		<input type="radio" name="theme" value="mymelody"/>
		<span><img src="mymelody.png" width="50px" id="mymelodyimage"/></span>
	</label>
	
	<br/>

	<label className='selectThemeImage'>
		<input type='radio' name='theme' value='picklerick'/>
		<span><img src='picklerick.png' width='70px' id='picklerickimage'/></span>
	</label>

	</form>
	
	<br/>
	<Link to='/contact' onClick={handleContactPageChange}>Contact</Link>

  </Offcanvas.Body>

  </Offcanvas>  

	<p className={`${selectedTheme}-label`}>{selectedTheme}</p>
</div>
);
}

export default Home;
