import React from 'react';
import { Component } from 'react';
import './style/Home.css'

class Home extends Component {
 
    constructor(props){
        super(props);
        this.state={apiResponse: ''};
    }

    callAPI(){
        fetch('http://localhost:8080/testAPI/test')
        .then(res => res.text())
        .then(res => this.setState({apiResponse:res}))
    }

    componentWillMount(){
        this.callAPI();
    }

    render(){
        return (
            <div>
                <input type='search' placeholder='Search' className='search' id='home-search'/>
                <p>{this.state.apiResponse}</p>
            </div>  
        );
    }
}

 
    /*  return (
        <div>
            <input type='search' placeholder='Search' className='search' id='home-search' />
        </div>
    );
}*/

export default Home;