import axios from "axios";

const scheme = process.env.REACT_APP_SERVER_SCHEME;
const domain = process.env.REACT_APP_SERVER_DOMAIN;
const port = process.env.REACT_APP_SERVER_PORT;

const jwt = localStorage.getItem("token");

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
}

class HttpRequest {
    constructor(url = "") {
        this.url = scheme + '://' + domain + ':' + port + url;
    }

    logUrl() {
        console.log(`HttpRequest url object:  ${this.url}`);
    }
}

export class GetRequest extends HttpRequest {

    async invoke() {
        const controller = new AbortController;
        let httpResponse;
        try {
            httpResponse = await axios.get(this.url, {
                signal: controller.signal,
                headers: headers
            });
            console.log(`GET ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(e)
        }
        controller.abort();
        console.log("Cleanup code for GET request has been executed");
        return httpResponse;
    }
}

export class DeleteRequest extends HttpRequest {

    async invoke() {
        const controller = new AbortController;
        let httpResponse;
        try {
            httpResponse = await axios.delete(this.url, {
                signal: controller.signal,
                headers: headers
            });
            console.log(`DELETE ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(e)
        }
        controller.abort();
        console.log("Cleanup code for DELETE request has been executed");
        return httpResponse;
    }
}

class DataRequest extends HttpRequest {

    constructor(url = "", data= {}) {
        super(url);
        this.data = data;
    }

    logData() {
        console.log(`HttpPostPutPatchRequest data object:  ${this.data}`);
    }
}

export class PostRequest extends DataRequest {

    async invoke() {
        const controller = new AbortController;
        let httpResponse;
        try {
            httpResponse = await axios.post(this.url, this.data, {
                signal: controller.signal,
                headers: headers
            });
            console.log(`POST ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(e)
        }
        controller.abort();
        console.log("Cleanup code for POST request has been executed");
        return httpResponse;
    }
}

export class PutRequest extends DataRequest {

    async invoke() {
        const controller = new AbortController;
        let httpResponse;
        try {
            httpResponse = await axios.put(this.url, this.data, {
                signal: controller.signal,
                headers: headers
            });
            console.log(`PUT ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(e)
        }
        controller.abort();
        console.log("Cleanup code for PUT request has been executed");
        return httpResponse;
    }
}

export class PatchRequest extends DataRequest {

    async invoke() {
        const controller = new AbortController;
        let httpResponse;
        try {
            httpResponse = await axios.patch(this.url, this.data, {
                signal: controller.signal,
                headers: headers
            });
            console.log(`PATCH ${this.url} yielded the following response: `, httpResponse);
        } catch (e) {
            console.error(e)
        }
        controller.abort();
        console.log("Cleanup code for PATCH request has been executed");
        return httpResponse;
    }
}