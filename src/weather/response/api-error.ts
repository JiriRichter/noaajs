export class ApiError {
    
    public correlationId: any;
    public detail: any;
    public instance: any;
    public path: any;
    public status: any;
    public title: any;
    public type: any;

    constructor(data: object) {
        this.correlationId = data['correlationId'];
        this.detail = data['detail'];
        this.instance = data['instance'];
        this.path = data['path'];
        this.status = data['status'];
        this.title = data['title'];
        this.type = data['type'];
    }
}