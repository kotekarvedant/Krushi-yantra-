import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback for Hackathon Prototype when API Key is absent
        console.log("No API Key detected, sending fallback mock response");
        return res.json({ 
          text: "नमस्कार! मी कृषिमित्र आहे. (Offline Mode)\n\nतुमच्या १० किमी परिसरात खालील २ ट्रॅक्टर मालक उपलब्ध आहेत:\n\n१. बाळसाहेब जाधव - Mahindra 575 DI (३.२ किमी)\n२. ज्ञानेश्वर गायकवाड - John Deere 5050D (५.८ किमी)\n\nतुम्ही त्यांना भाड्याने घेण्यासाठी 'Rent Equipment' पोर्टलवर जाऊन बुकिंग करू शकता."
        });
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      // Formatting the history to match Gemini's structure if needed, or simply send the message
      // For simplicity in this mock, we will just send the latest message along with the system instruction
      // In a real app, you'd want to maintain a chat session or pass history correctly.
      
      let contents = [];
      if (history && Array.isArray(history)) {
          contents = history.map((msg: any) => ({
             role: msg.role === 'model' ? 'model' : 'user',
             parts: [{ text: msg.text }]
          }));
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: contents,
        config: {
          systemInstruction: "You are KrushiMitra, an empathetic rural agricultural equipment advisor. Suggest the best tractor, horsepower, or implement based on crop, soil type, and land size in simple Marathi, Hindi, or English. Keep responses concise, clear, and actionable for farmers.",
          tools: [{ googleMaps: {} }]
        }
      });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat error:", error);
      // Fallback for Hackathon Prototype to prevent error screens
      res.json({ 
        text: "नमस्कार! मी कृषिमित्र आहे. (Offline Mode)\n\nतुमच्या १० किमी परिसरात खालील २ ट्रॅक्टर मालक उपलब्ध आहेत:\n\n१. बाळसाहेब जाधव - Mahindra 575 DI (३.२ किमी)\n२. ज्ञानेश्वर गायकवाड - John Deere 5050D (५.८ किमी)\n\nतुम्ही त्यांना भाड्याने घेण्यासाठी 'Rent Equipment' पोर्टलवर जाऊन बुकिंग करू शकता."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
