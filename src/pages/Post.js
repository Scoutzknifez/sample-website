import React from "react";
import './Post.css';

import * as API from "../utility/Connector";

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            text: ""
        };
    }

    handleTitleChange(event) {
        let title = event.target.value;
        this.setState({title});
    }

    handleTextChange(event) {
        let text = event.target.value;
        this.setState({text});
    }

    postBlog(event) {
        // Stops the default form submission behavior
        event.preventDefault();

        API.postBlog(this.state)
        .then(() => {
            window.location.href = "/";
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div 
                className = "workable-post-space"
            >
                <p
                    className = "post-title"
                >
                    Create Blog Post
                </p>
                <form
                    className = "post-form"
                    onSubmit = {event => this.postBlog(event)}
                >
                    <input
                        className = "blog-title"
                        type = "text" 
                        placeholder = "Title"
                        onChange = {event => this.handleTitleChange(event)}
                    />
                    <textarea
                        className = "blog-body"
                        placeholder = "Post Body"
                        onChange = {event => this.handleTextChange(event)}
                    ></textarea>
                    <input
                        className = "submit-button"
                        type = "submit" 
                        value = "Submit"
                    />
                </form>
            </div>
        );
    }
}

export default Post;