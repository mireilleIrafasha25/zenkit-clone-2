
export const ValidateDateformat= async(req, res, next) =>{
    const dateFormat="YYYY-MM-DDTHH:MM:SS.SSS"
 const startDate=req.body.dueDate.startDate;
 const endDate=req.body.dueDate.endDate;
    if(!dateFormat.match(startDate) ||(!dateFormat.match(endDate))) {
        return res.status(400).json({
            message: "Date Format must be in the format YYYY-MM-DDTHH:MM:SS"
        });
    }
}