import * as Constants from "../utility/Constants";

export function getAll() {
    return new Promise(
        function(resolve, reject) {
            let header = {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            };

            fetch(Constants.API_ENDPOINT, header)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        }
    );
}

export function postBlog(blog) {
    return new Promise(
        function(resolve, reject) {
            blog = {
                ...blog,
                id: "create"
            };

            let header = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(blog)
            };

            fetch(Constants.API_ENDPOINT, header)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        }
    );
}

export function deletePost(id) {
    return new Promise(
        function(resolve, reject) {
            let header = {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            };

            let url = Constants.API_ENDPOINT + `?id=${id}`;

            fetch(url, header)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        }
    );
}

export function editPost(blog) {
    return new Promise(
        function(resolve, reject) {
            delete blog.isEditing;
            delete blog.time;

            let header = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(blog)
            };

            let url = Constants.API_ENDPOINT;

            fetch(url, header)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        }
    );
}