import React, { Component } from 'react';
import './App.css';
import {Container,Box, Heading,Card,Image,Text,SearchField,Icon,Spinner} from 'gestalt';
import {Link} from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi (apiUrl);

class App extends Component {
  state={
    brands:[],
    searchTerm:"",
    loadingBrands:true
  }

  async componentDidMount(){
    try{
      const response = await strapi.request('POST','/graphql',{
        data:{
          query:`query{
            brands {
              _id
              name
              description
              image {
                url
                name
              }
            }
          }`
        }
      });
      this.setState({ brands:response.data.brands ,loadingBrands:false});
    }
    catch(err){
      console.log(err);    
      this.setState({ loadingBrands:false }); 
    }   
  }
  
  handleChange=({ value })=>{
    this.setState({ searchTerm : value });
  };

  filterBrands =({ searchTerm,brands })=>{
      return brands.filter(brand => {
        return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      });
  };

  render() {
    const { searchTerm, loadingBrands } =this.state;

    return (   
      <Container>
        {/* Search field */}
        <Box display="flex" justifyContent="center" lgMarginTop={4}>
          <SearchField id="searchField" accessibilityLabel="Brands Search Field"
            onChange={this.handleChange} placeholder="Search" 
            value={searchTerm}/>
          <Box margin={2}>
            <Icon icon="filter" color={ searchTerm ? 'eggplant' : 'gray'}
              size={20} accessibilityLabel="Filter"/>
          </Box>
        </Box>
        
        {/* Brands Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>        
          {/* BrandHeader */}
          <Heading color="midnight" size="md">
            Brew
          </Heading>
        </Box>
        
        {/* Brands */}
        <Box 
        shape="rounded" wrap display="flex" justifyContent="around">
          {this.filterBrands(this.state).map(brand => (
            <Box width={200} magin={2} key = {brand._id}>
              <Card image={
                <Box height={200} width={200}>
                  <Image alt="Brand"
                  naturalHeight={1}
                  naturalWidth={1}
                  marginBottom={5}
                  src={`${apiUrl}${brand.image[0].url}`}
                  />
                </Box>}>
                <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                  <Text bold size="xl">{brand.name}</Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>Detail</Link>
                  </Text> 
                </Box>              
              </Card>
            </Box>
          ))}
        </Box>
              
        <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner"/>
      </Container>
    );
  }
}

export default App;
