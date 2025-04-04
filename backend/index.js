const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection with error handling
mongoose.connect('mongodb+srv://jatavankit486:AnkitJatav@noteshare.sj38dtr.mongodb.net/?retryWrites=true&w=majority&appName=noteShare', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
});

const noteSchema = new mongoose.Schema({
    customId: { type: String, unique: true, required: true },
    text: String,
    createdAt: { type: Date, expires: 600, default: Date.now } // Auto-delete after 10 minutes
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

app.post('/save', async (req, res) => {
    const { customId, text } = req.body;
    if (!customId || !text) return res.status(400).json({ error: 'Custom ID and text are required' });

    try {
        const note = new Note({ customId, text });
        await note.save();
        res.json({ id: customId });
    } catch (error) {
        res.status(400).json({ error: 'Custom ID already exists, choose another' });
    }
});

app.get('/notes', async (req, res) => {
    try {
      const notes = await Note.find({}, { customId: 1, text: 1, _id: 0 }); // Only return customId and text
      res.json({ notes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  });

app.get('/note/:customId', async (req, res) => {
     console.log(req.params.customId); // Debugging line to check the customId
    const note = await Note.findOne({ customId: req.params.customId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ text: note.text });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
