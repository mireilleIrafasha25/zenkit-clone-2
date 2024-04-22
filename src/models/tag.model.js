import { model, Schema } from "mongoose";

const TagSchema = new Schema({
    name: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'VERY HIGH'],
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },});
    TagSchema.pre("save", function(){
        const colors=["red","orange","yellow","green","blue","indigo","violet","purple","pink","brown","grey","black","white"];
        const randomIndex=Math.floor(Math.random()*colors.length);
        this.color=colors[randomIndex];
    })
const Tag = model("Tag", TagSchema);
export default Tag;