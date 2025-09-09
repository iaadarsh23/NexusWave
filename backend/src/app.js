import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/socketmanagers.js";
import cors from "cors";

const app = express();
app.use(cors()); // Good for development!

// 1. Wrap Express app with HTTP server
const server = createServer(app);

// 2. Make Socket.IO talk to HTTP server
const io = connectToSocket(server);

// 3. Set port
app.set("port", process.env.PORT || 8000);

// 4. (Optional) Create REST endpoint
app.get("/home", (req, res) => {
	return res.json({ hello: "adarsh" });
});

// 5. Handle real-time connections
io.on("connection", (socket) => {
	console.log("new socket connected!", socket.id);
	// Add your real time event handlers here
});

// 6. Start with async function: FIRST connect MongoDB, THEN start server
const start = async () => {
	try {
		const connectDb = await mongoose.connect(
			"mongodb+srv://adarshtrip2306:nexus@nexuswave.kli0bhb.mongodb.net/"
		);
		console.log(`Database is connected`);

		server.listen(app.get("port"), () => {
			console.log(`listening on port ${app.get("port")}`);
		});
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
};

start();
