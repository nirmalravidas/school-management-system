import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT;

const startServer = () => {
    try{
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (err){
        console.error("Error starting the server:", err);
    }
};

startServer();