import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className = "header">
                <div
                    onClick = {() => window.location.href = "/"}
                    className = "home-button"
                >
                    <p
                        className = "home-text"
                    >
                        Home
                    </p>
                </div>

                <div className = "splitter"/>
                
                <div
                    onClick = {() => window.location.href = "/post"}
                    className = "post-button"
                >
                    <p
                        className = "post-text"
                    >
                        + New Post
                    </p>
                </div>
            </div>
        );
    }
}

export default Header;