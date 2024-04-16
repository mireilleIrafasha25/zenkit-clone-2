const swaggerdocumentation=
{
    "openai":"3.2.0",
    "info":
    {
        "title":"zenkit clone Application",
        "description":"This is the API Specification for the zenkit clone app backend.",
        "contact":{"email":"mireilleirafashan@gmail.com"},
        "license":{
            "name":"MIT",
            "url":"https://opensource.org/licenses/mit"
        },
        "version": "1.0.0"
    },
    "extrenalDocs":{
        "description":"Get source code",
        "url":"https://github.com/mireilleIrafasha25/zenkit-clone-2"
    },
    "basePath":"/api/v1",
    "servers":
    [
        {
            "url":"http://localhost:4000",
            "description":"Local server"
        },
        {
            "url":"https://zenkit-clone.onrender.com",
            "description":"production server"
        }
    ],
    "schemes":["http","https"],
    "tags":[
        {
            "name":"Tasks",
            "description":"Operation pertaining to tasks"
        }
    ],
    "paths":{
"task/add":{
"post":
{
    "tags":["Tasks"],
    "summary":"Add a new task",
    "description":"Creates a new task with  the provided details",
    "requestBody":{
        "content":{
            "application/json":
            {
                "schema":{
                    "$ref": "#/definitions/Task"
                }
            }
        }
    },
    "response":{
        "201":
        {
            "description":"Task created successfully",
            "content":{
                "application/json":
                {
                    "schema":{
                        "$ref":"#/definitions/Task"
                    }
                }
            }
        },
        "400":
        {
            "description":"Bad request -Validation error",
            "content":{
                "application/json":{
                    "schema":{
                        "type": "object",
                        "properties":{
                            "message":{
                                "type":"string"
                            }
                        }
                    }
                }
            }
        }
    }
}

}
    },
    "definition":
    {
"schemas":
{
    "Tasks":
    {
        "type":"object",
        "properties":
        {
            "_id":
            {
                "type":"string",
                "description":"Unique identifier of the task"
            },
            "name":
            {
                "type":"string",
                "description":"Name of the task",
                "required":true
                
            },
            "description":{
                "type":"string",
                "description":"Description of the task"
            },
            "status":
            {

                "type":"string",
                "description":"Status of the task",
                "enum":["Todo","Completed","In progress","Late","Over-due"]
            },
            "dueDate":{
                "type":"object",
                "properties":
                {
                    "startDate":
                    {
                        "type":"string",
                        "format":"date",
                        "description":"Start date of the duedate"
                    },
                    "endDate":
                    {
                        "type":"string",
                        "format":"date",
                        "description":"End date of the duedate"
                    },
                    "startTime":{
                        "type":"string",
                        "format":"date",
                        "description":"Start time of the duedate"
                    },
                    "endTime":{
                        "type":"string",
                        "format":"date",
                        "description":"End time of the duedate"
                    },
                    "duration":{
                        "type":"duration",
                        "description":"Duration of task"
                    },
                    "durationTask":
                    {
                        "type":"string",
                        "enum":["Minute","Hour","Days","Week","Months"],
                        "description":"Type of duration(Minutes,Hours,Days,etc)"
                    }
                
                }
            }
        }
    }
}
    }
}
export default swaggerdocumentation;