import axios from "axios";

const scheme = process.env.REACT_APP_SERVER_SCHEME;
const domain = process.env.REACT_APP_SERVER_DOMAIN;
const port = process.env.REACT_APP_SERVER_PORT;

const jwt = localStorage.getItem("token");

class HttpRequest {
    constructor(url = "") {
        if (jwt) {
            this.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        } else {
            this.headers = {
                "Content-Type": "application/json",
            }
        }
        this.url = scheme + '://' + domain + ':' + port + url;
        console.log("HTTP request created.")
        console.log("headers object: ", this.headers)
    }

    logUrl() {
        console.log(`HttpRequest url object:  ${this.url}`);
    }
}

export class GetRequest extends HttpRequest {

    async invoke() {
        const controller = new AbortController();
        let httpResponse;
        try {
            console.log(`Now sending GET request to ${this.url}`);
            httpResponse = await axios.get(this.url, {
                signal: controller.signal,
                headers: this.headers,
            });
            console.log(`GET ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(`GET request to ${this.url} failed with the following error:\n${e}`);
            return e;
        }
        controller.abort();
        console.log("Cleanup code for GET request has been executed");
        return httpResponse;
    }
}

export class DeleteRequest extends HttpRequest {

    async invoke() {
        const controller = new AbortController();
        let httpResponse;
        try {
            console.log(`Now sending DELETE request to ${this.url}`);
            httpResponse = await axios.delete(this.url, {
                signal: controller.signal,
                headers: this.headers
            });
            console.log(`DELETE ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(`DELETE request to ${this.url} failed with the following error:\n${e}`);
            return e;
        }
        controller.abort();
        console.log("Cleanup code for DELETE request has been executed");
        return httpResponse;
    }
}

class DataRequest extends HttpRequest {

    constructor(url = "", data = {}) {
        super(url);
        this.data = data;
    }

    logData() {
        console.log(`HttpPostPutPatchRequest data object:  ${this.data}`);
    }
}

export class PostRequest extends DataRequest {

    async invoke() {
        const controller = new AbortController();
        let httpResponse;
        try {
            console.log(`Now sending POST request to ${this.url} with the following data in the body: \n  ${this.data}`);
            httpResponse = await axios.post(this.url, this.data, {
                signal: controller.signal,
                headers: this.headers
            });
            console.log(`POST ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(`POST request to ${this.url} failed with the following error:\n${e}`);
            return e;
        }
        controller.abort();
        console.log("Cleanup code for POST request has been executed");
        return httpResponse;
    }
}

export class PutRequest extends DataRequest {

    async invoke() {
        const controller = new AbortController();
        let httpResponse;
        try {
            console.log(`Now sending PUT request to ${this.url} with the following data in the body: \n  ${this.data}`);
            httpResponse = await axios.put(this.url, this.data, {
                signal: controller.signal,
                headers: this.headers
            });
            console.log(`PUT ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(`PUT request to ${this.url} failed with the following error:\n${e}`);
            return e;
        }
        controller.abort();
        console.log("Cleanup code for PUT request has been executed");
        return httpResponse;
    }
}

export class PatchRequest extends DataRequest {

    async invoke() {
        const controller = new AbortController();
        let httpResponse;
        try {
            console.log(`Now sending PATCH request to ${this.url} with the following data in the body: \n  ${this.data}`);
            httpResponse = await axios.patch(this.url, this.data, {
                signal: controller.signal,
                headers: this.headers
            });
            console.log(`PATCH ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(`PATCH request to ${this.url} failed with the following error:\n${e}`);
            return e
        }
        controller.abort();
        console.log("Cleanup code for PATCH request has been executed");
        return httpResponse;
    }
}