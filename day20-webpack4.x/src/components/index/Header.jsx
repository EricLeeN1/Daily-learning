import React from 'react';

import Banner from './Banner';
import HeaderCss from '@/styles/header.scss';
import Tab from './Tab';
import SearchBar from './SearchBar';
import List from './List';



export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            position: "三门峡"
        }
    };
    render (){
        return <header className={HeaderCss.header}>
             <Banner></Banner>
             <div className={HeaderCss.position}>{this.state.position}</div>
             <Tab></Tab>
             <SearchBar></SearchBar>
             <List></List>
        </header> 
    }
}
