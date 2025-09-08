import express from "express";

import mongoose from "mongoose";

import { Server } from "socket.io";
import { createServer } from "node:http";

import cors from "cors";

//think this like a vein diagram , first it has server then io then app
const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("port", process.env.PORT || 8000);

app.get("/home", (req, res) => {
	return res.json({ hello: "adarsh" });
});

const start = async () => {
	const connectDb = server.listen(app.get("port"), () => {
		console.log("listening on port 8000");
	});
};

start();
