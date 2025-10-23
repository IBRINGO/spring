import React from 'react';
import { Navbar, Nav } from 'react-bootstrap' ;


class NavigationBar extends React.Component {
render () { return (
<Navbar bg="dark" variant="dark">
<Navbar.Brand href="/">
<img
src="https: //upload.wikimedia.org/wikipedia/commons/1/17/Tata Tamo Racemo
jpg"
width="25" height="25" />
</Navbar.Brand>
<Nav className="mr-auto">
<Nav.Link href="/add"> Ajouter Voiture</Nav.Link>
<Nav.Link href="/list">
Liste Voitures
</Nav.Link>
</Nav>
</Navbar>
)}
}
export default NavigationBar;