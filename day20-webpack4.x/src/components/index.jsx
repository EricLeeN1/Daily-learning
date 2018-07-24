import React  from 'react';
import Header from './index/Header';

export default class App extends  React.Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return (<div>
            <Header>Header</Header>
            {/* <Content>Content</Content> */}
            {/* <Footer>Footer</Footer> */}
        </div>)
    }
}