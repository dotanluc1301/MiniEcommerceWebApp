import React from 'react';
import {Box,Text,Image} from 'gestalt'
import {NavLink} from 'react-router-dom';

const Navbar = () =>(
    <Box height={70} color='orchid' margin={5} padding={1} shape="rounded" display="flex" alignItems="center" justifyContent="around">

        {/* Sign in link*/}
        
        <NavLink activeClassName="active" to="/signin"> 
            <Text size="xl" color="white">Sign In</Text>
        </NavLink>

        {/*Tilte and Logo */}
        {/*Logo */}
        <NavLink activeClassName="active" to="/">
            <Box display="flex" alignItems="center">
                <Box height={50} width={50} margin={10}>
                    <Image src="./icons/logo.svg"
                        alt="BrewHaha Logo" naturalHeight={1} naturalWidth={1} 
                    />
                </Box>
            {/*Title */}
            {/*<Heading size="xs" color="orange">BrewHaha</Heading>*/}
            </Box>
        </NavLink>

        {/* Sign up link*/}
        <NavLink activeClassName="active" to="/signup"> 
            <Text size="xl" color="white">Sign Up</Text>
        </NavLink>
    
    </Box>
)

export default Navbar;