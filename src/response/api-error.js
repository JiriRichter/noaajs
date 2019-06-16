/* @class Error
 * @aka NOAA.Error
 *
 * Represents a API error response.
 * */
class ApiError {
    constructor(data) {
        /*
        correlationId: "f8f32885-c8f4-48e6-82be-ef6975c63884"
        detail: "'/points/12' is not a valid resource path"
        instance: "https://api.weather.gov/requests/f8f32885-c8f4-48e6-82be-ef6975c63884"
        path: "/points/12"
        status: 404
        title: "Not Found"
        type: "https://api.weather.gov/problems/NotFound"
        */

        this.correlationId = data['correlationId'];
        this.detail = data['detail'];
        this.instance = data['instance'];
        this.path = data['path'];
        this.status = data['status'];
        this.title = data['title'];
        this.type = data['type'];
    }
}

export { ApiError };