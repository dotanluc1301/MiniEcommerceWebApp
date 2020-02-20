import React from 'react';
import {Container,Box,Button,Heading,Text,TextField} from 'gestalt';
import ToastMessage, {toastMessage} from './ToastMessage';

class Signup extends React.Component{
    state={
        username:'',
        password:'',
        email:'',
        toast:false,
        toastMessage:''
    }

    //Get data from form( username, password,email)
    handleChange = ({event,value})=>{
        event.persist();
        this.setState({ [event.target.name]:value });
    }

    //handle event hit submit button from user
    handleSubmit =(event)=>{
        event.preventDefault();
        if(this.isFormEmty(this.state)){
            this.showToast("Please fill in all fields");
            return;
        }
        console.log("submitted");
    }
    
    //check either username or password or email is empty or not
    isFormEmty=({username,password,email})=>{
        return !username || !password || !email
    };

    //
    showToast=toastMessage => {
        this.setState({ toast : true, toastMessage});
        setTimeout(() => this.setState({ toast:false , toastMessage:''}),5000)
    }

    render(){
        const {toastMessage,toast} = this.state;

        return(
            <Container>
                <Box dangerouslySetInlineStyle={{
                    __style:{
                        backgroundColor:'#d633ff'
                    }
                }}
                margin={4} padding={4} shape="rounded" display="flex" justifyContent="center">
                    {/* Sign Up Form */}
                    <form style ={{
                            display:'inlineBlock',
                            textAlign:'center',
                            maxWidth:450,                       
                        }}
                        onSubmit={this.handleSubmit}>
                        {/* Heading */}
                        <Box marginBottom={2} display="flex" direction="column" alignItems="center">
                            <Heading color="midnight">Start here</Heading>
                        </Box>

                        {/* Input field: username */}
                        <TextField id="username" type="text" name="username" placeholder="Your username" onChange={this.handleChange} padding={10}/>
                        
                        {/* Input field: password */}
                        <TextField id="password" type="password" name="password" placeholder="Your password" onChange={this.handleChange} padding={10}/>
                        
                        {/* Input field: email */}
                        <TextField id="email" type="email" name="email" placeholder="Your email" onChange={this.handleChange} padding={10}/>
                    
                        {/* Button submit */}
                        <Button inline color="white" text="submit" type="submit" />
                    </form>
                </Box>
                <ToastMessage show={toast} message={toastMessage}></ToastMessage>
            </Container>
        )
    }
}

export default Signup;