import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Todo","In Progress", "Completed", "Late", "Over-due"],
            message: "{VALUE} is not a valid status",
        },
        default: "Todo",
    },
    parentTask:{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    },
    tags:{
        type: Array,
        required: false,
    },

    checklist:
    {
        description: {
            type: String,
            required: false
          },
          completed: {
            type: Boolean,
            default: false
          }
    },
    workload: {
        type: Number,
        min: 0,
        max: 5,
        default: 3
      },
    dueDate: {
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
        startTime: {
            type: String,
            required: false,
        },
        endTime: {
            type: String,
            required: false,
        },
        duration: {
            type: Number,
            required: false,
        },
        durationType: {
            type: String,
            required: false,
            enum: {
                values: ["Minutes","Hours","Days", "Weeks", "Months"],
                message: "{VALUE} is not a valid duration type",
            },
        }
    }
});

const Task = model("Task", TaskSchema);
export default Task;