const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 👇 Connect to existing hostelDB
mongoose.connect('mongodb://localhost:27017/hostelDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 👇 Use 'candidates' collection
const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  rent: String,
  joinDate: String,
  email: String,
  building: String,
  floor: String,
  room: String,
  rentPaid: String,
}, { collection: 'candidates' });  // ✅ important

const Candidate = mongoose.model('Candidate', formSchema);

app.post('/addData', async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(200).send("Inserted into MongoDB 'candidates'");
  } catch (error) {
    res.status(500).send("Error inserting data");
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
