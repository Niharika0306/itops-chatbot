const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/generate', async (req, res) => {
  const { message } = req.body;
  const targetURL = process.env.TARGET_URL
  console.log(`Forwarding request to: ${targetURL}, with message: ${message}`);

  try {
      const response = await axios.post(`${targetURL}/generate`, {
        prompt: message,
        temperature: 0.2,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json(response.data);
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from model API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
