class ApiError{
    constructor(statusCode=500,message="something went wrong"){
        this.statusCode=statusCode,
        this.message=message,
        this.success=false
    }
}

export default ApiError