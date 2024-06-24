const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require("http");
const { Server } = require("socket.io");

// Define the schemas for doctors and patients
const doctorSchema = new mongoose.Schema({
  id:{type:Number,required:true},
  name: { type: String },
  specialty: { type: String },
  email: { type: String },
  phone: { type: String },
});

const patientSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  phone: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
});

// Create models for doctors and patients
const Doctor = mongoose.model('Doctor', doctorSchema);
const Patient = mongoose.model('Patient', patientSchema);

const app = express();
const port = process.env.PORT || 3000;

app.post("/p", async (req, res) => {
  try {
    const { name, age, email, phone, doctorId } = req.body;
    const patient = new Patient({ name, age, email, phone, doctorId });
    await patient.save();
    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Failed to create patient", error });
  }
});

app.post("/d", async (req, res) => {
  
  try {
    const { id,name, specialty, email, phone } = req.body;
    console.log(req.body);
    const doctor = new Doctor({id, name, specialty, email, phone });
    await doctor.save();
    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Failed to create doctor", error });
  }
});

// Retrieve the last doctor
app.get("/doctors/last", async (req, res) => {
  try {
    const lastDoctor = await Doctor.findOne().sort({ _id: -1 });
    res.status(200).json(lastDoctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve last doctor", error });
  }
});

// Retrieve the last patient
app.get("/patients/last", async (req, res) => {
  try {
    const lastPatient = await Patient.findOne().sort({ _id: -1 });
    res.status(200).json(lastPatient);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve last patient", error });
  }
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

server.listen(3001, () => {
  console.log("Server is connected");
});

io.on("connection", (socket) => {
  
  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

// Add middleware and routes for your Express app here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ... your existing routes and logic ...