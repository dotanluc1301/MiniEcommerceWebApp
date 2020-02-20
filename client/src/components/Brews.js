import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import {Box,Heading,Text,Image,Card,Button,Mask,IconButton} from 'gestalt';
import {Link} from 'react-router-dom';
import {calculate,getCart,setCart} from '../utils';
const apiUrl=process.env.apiUrl || "http://localhost:1337";
const strapi=new Strapi(apiUrl);

class Brews extends React.Component{
    state={
        brews:[],
        brand:'',
        cartItems:[]
    }

    //Get item by API (post)
    async componentDidMount(){
        try{
        const response = await strapi.request('POST','/graphql',{
            data:{
               query:`query{
                brand(id:"${this.props.match.params.brandId}") {
                  _id
                  name	
                  brews{
                      _id
                    name     
                    description
                    image{
                      url
                    }
                    price
                  }
                }
              }` 
            }
        });
        this.setState({
            brews:response.data.brand.brews,
            brand:response.data.brand.name,
            cartItems : getCart()
        });
        }catch(error)    {
            console.error(error);
        }
    }

    //function add an item to user 's cart
    addToCart = (brew)=>{
        const alreadyInCart = this.state.cartItems.findIndex(item=>item._id === brew._id);
        
        //when item is not available in cart
        //add a new item into cart
        if(alreadyInCart === -1){
            const updateItems= this.state.cartItems.concat({
                ...brew,
                quantity:1
            });
            this.setState({ cartItems : updateItems},()=>setCart(updateItems));
        }
        //when item is available in cart
        //rise quantity of item by 1 
        else{
            const updateItems = [...this.state.cartItems];
            updateItems[alreadyInCart].quantity+=1;
            this.setState({ cartItems :updateItems},()=>setCart(updateItems));
        }
    };

    //function remove an item from user cart
    deleteItem=(_id)=>{
        const filteredItems = this.state.cartItems.filter(item => item._id !== _id);
        this.setState({ cartItems : filteredItems },()=>setCart(filteredItems));
    };

    render(){
        const { brand,brews,cartItems }=this.state;

        return(
        <Box marginTop={4} display="flex" justifyContent="center" alignItems="start"
        dangerouslySetInlineStyle={{
            __style:{
                flexWrap:'wrap-reverse'
            }
        }}>
                {/* Brews Sections */}
                <Box margin={2}>
                    {/* Heading Section */}
                    <Heading color="orchid" >{brand}</Heading>

                    {/*Brews */}
                    <Box marginTop={5} dangerouslySetInlineStyle={{
                        __style:{
                            backgroundColor:"#d633ff",
                            flexWrap:'wrap'
                        }
                    }} shape="rounded" display="flex" justifyContent="center" padding={4} >
                        {brews.map(brew=>(
                            <Box paddingY={4} width={210} magin={2} key = {brew._id}>
                                <Card image={
                                    <Box marginLeft={7} height={200} width={150} >
                                        <Image alt="Brand" naturalHeight={1} naturalWidth={1} src={`${apiUrl}${brew.image[0].url}`} fit="cover" />
                                    </Box>}>
                                    <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                                        <Box marginBottom={2}>
                                            <Text bold size="xl">{brew.name}</Text>
                                        </Box>
                                        {/* <Text>{brew.description}</Text> */}
                                        <Text color="midnight">{brew.price}</Text>
                                        <Box marginTop={2}>
                                            <Text bold size="xl">
                                                <Button onClick={() => this.addToCart(brew)} color="white" text="Add to cart"></Button>
                                            </Text> 
                                        </Box>
                                    </Box>              
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>
                
                {/* User cart */}
                <Box alignSelf="end" margin={2} marginLeft={8} display="flex" direction="column" alignItems="center" padding={2}>
                    <Mask shape="rounded" wash>

                    {/* Cart Heading */}
                    <Heading align="center" size="md">Your Cart</Heading>
                    <Text color="olive" italic>You have {cartItems.length} item(s) total</Text>

                    {/* Cart Items */}
                    {cartItems.map(item=>(
                        <Box key={item._id} display="flex" alignItems="center">
                            <Text>
                                {item.name} x {item.quantity} - ${(item.quantity * item.price).toFixed(2)}
                            </Text>
                            <IconButton accessibilityLabel="Delete Item" icon="cancel" size="sm" iconColor="darkGray"
                                onClick={()=>this.deleteItem(item._id)}/>                            
                        </Box>
                    ))}


                    <Box display="flex" alignItems="center" justifyContent="center" direction="column" >
                        <Box margin={2}>
                            {cartItems.length === 0 && (
                                <Text color ="pine">Please pick some items</Text>
                            )}
                        </Box>
                        <Text size="lg"> Total : {calculate(cartItems)}</Text>
                        <Text>
                            <Link to="/checkout">Checkout</Link>
                        </Text>
                    </Box>
                    </Mask>
                </Box>
            </Box>  
        );
    }
}

export default Brews;