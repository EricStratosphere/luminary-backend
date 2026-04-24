import prompt from "../services/gemini-pro.js"
export const promptText = (req, res) => {
    try{
        const result = prompt(req.body.prompt);
        return res.status(200).json(
            {
                success : true,
                response : result
            }
        )
    }
    catch(error){
        return res.status(500).json(
            {
                success : false,
                message : error.message
            }
        )
    }
}
