import React from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class SearchBarExample extends React.Component {
    state = {
        value: '美食',
    };
    // componentDidMount() {
    //     this.autoFocusInst.focus();
    // }
    // onChange = (value) => {
    //     this.setState({ value });
    // };
    // clear = () => {
    //     this.setState({ value: '' });
    // };
    // handleClick = () => {
    //     // this.manualFocusInst.focus();
    // }
    render() {
        return <SearchBar placeholder="Search" maxLength={8} />
    }
}
