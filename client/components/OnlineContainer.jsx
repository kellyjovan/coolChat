import React, { Component } from 'react';

const styles = {
    thing: {
        width:'10px',
        height:'10px',
        'border-radius': '50%',
        background: 'black',
        display:'inline-block'
    }
}

class OnlineContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { subscribeToMore } = this.props;
        subscribeToMore();
    }
    render() {
        const { users } = this.props.data;
        const arr = users.map((item) => {
            return <p>{item} <div style={styles.thing}></div></p>;
        })
        return (
            <div>
                {arr}
            </div>
        )
    }
}

export default OnlineContainer;
