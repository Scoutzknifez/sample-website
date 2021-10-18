import React from "react";
import './Home.css';

import * as API from "../utility/Connector";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            editingBlogs: {}
        };
    }

    componentDidMount() {
        API.getAll()
        .then(result => {
            let blogs = result.blogs;
            blogs.forEach(blog => blog.isEditing = false);

            this.setState({blogs: result.blogs});
        })
        .catch(err => console.log(err));
    }

    clickDelete(id) {
        API.deletePost(id)
        .then(() => {
            // Force home page refresh
            window.location.href = "/";
        })
        .catch(err => console.log(err));
    }

    clickEdit(blog) {
        blog.isEditing = true;
        this.forceUpdate();
    }

    handleChange(event, blog, isTitle) {
        let changedValue = event.target.value;
        let editableBlogs = {...this.state.editingBlogs};

        if (editableBlogs[blog.id] == null) {
            editableBlogs[blog.id] = blog;
        }

        editableBlogs[blog.id][isTitle ? "title" : "text"] = changedValue;

        this.setState({editingBlogs: editableBlogs});
    }

    finishEdit(blog) {
        let editableBlogs = {...this.state.editingBlogs};

        if (editableBlogs[blog.id] == null) {
            blog.isEditing = false;
            this.forceUpdate();
            return;
        }

        API.editPost(editableBlogs[blog.id])
        .then(() => {
            // Force home page refresh
            window.location.href = "/";
        })
        .catch(err => console.log(err));
    }

    clickCancel(blog) {
        let editableBlogs = {...this.state.editingBlogs};

        blog.isEditing = false;

        if (editableBlogs[blog.id] != null) {
            delete editableBlogs[blog.id];
            this.setState({editingBlogs: editableBlogs});
        }
        else {
            this.forceUpdate();
        }
    }

    renderBlogs() {
        let elements = [];

        for (let i = 0; i < this.state.blogs.length; i++) {
            const blog = this.state.blogs[i];

            elements.push(
                <div
                    className = "blog-box"
                    key = {blog.id}
                >
                    {
                        !blog.isEditing && (
                            <div>
                                <p
                                    className = "blog-title"
                                >
                                    {blog.title}
                                </p>
                                <p
                                    className = "blog-text"
                                >
                                    {blog.text}
                                </p>
                                <div
                                    className = "blog-bottom-container"
                                >
                                    <div
                                        className = "blog-small-button-container"
                                    >
                                        <div
                                            onClick = {() => this.clickDelete(blog.id)}
                                            className = "blog-delete-button"
                                        >
                                            <p
                                                className = "blog-delete-text"
                                            >
                                                Delete
                                            </p>
                                        </div>
                                        <div
                                            onClick = {() => this.clickEdit(blog)}
                                            className = "blog-edit-button"
                                        >
                                            <p
                                                className = "blog-edit-text"
                                            >
                                                Edit
                                            </p>
                                        </div>
                                    </div>
                                    <div className = "splitter"/>
                                    <p
                                        className = "blog-time"
                                    >
                                        Posted on {new Date(blog.time).toDateString()}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    {
                        blog.isEditing && (
                            <div
                                className = "blog-edit-box"
                            >
                                <input
                                    className = "blog-editing-title"
                                    type = "text"
                                    placeholder = "Title"
                                    defaultValue = {blog.title}
                                    onChange = {event => this.handleChange(event, blog, true)}
                                />
                                <textarea
                                    className = "blog-editing-body"
                                    placeholder = "Post Body"
                                    defaultValue = {blog.text}
                                    onChange = {event => this.handleChange(event, blog, false)}
                                ></textarea>
                                <div
                                    className = "blog-bottom-container"
                                >
                                    <div
                                        onClick = {() => this.clickCancel(blog)}
                                        className = "blog-delete-button"
                                    >
                                        <p
                                            className = "blog-delete-text"
                                        >
                                            Cancel
                                        </p>
                                    </div>
                                    <div
                                        onClick = {() => this.finishEdit(blog)}
                                        className = "blog-edit-button"
                                    >
                                        <p
                                            className = "blog-edit-text"
                                        >
                                            Save
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        }

        return elements;
    }

    render() {
        return (
            <div 
                className = "workable-home-space"
            >
                <p 
                    className = "home-title"
                >
                    Blog Feed
                </p>
                {
                    this.renderBlogs()
                }
            </div>
        );
    }
}

export default Home;