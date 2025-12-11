import React, { useState } from "react";

const App: React.FC = () => {
  const [emailText, setEmailText] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const PREDICT_URL = "https://dangminh214-spam-email-classifier.hf.space/predict/"; 
  const INFO_URL = "https://dangminh214-spam-email-classifier.hf.space/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(PREDICT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText }),
      });
      const data = await response.json();
      setPrediction(data.prediction === "spam" ? "Spam E-Mail" : "Legit E-Mail");
    } catch (err) {
      console.error(err);
      setPrediction("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInfoClick = async () => {
    try {
      const response = await fetch(INFO_URL);
      const data = await response.json();
      setInfo(data.info);
    } catch (err) {
      console.error(err);
      setInfo("Error fetching info");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        justifyContent: "center", 
        padding: "20px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <h1>Spam Email Classifier</h1>
      <p>Enter your email below, and the model will predict if it's spam or not.</p>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Enter email content..."
          style={{ width: "100%", height: "150px", padding: "10px", fontSize: "14px" }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Classifying..." : "Classify Email"}
        </button>
      </form>

      {prediction && (
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", margin: "0 auto" }}>
          Prediction: {prediction}
        </div>
      )}

      <button
        onClick={handleInfoClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "100%",
          maxWidth: "500px",
          margin: "20px auto 0 auto",
        }}
      >
        Info
      </button>

      {info && (
        <div style={{ marginTop: "20px", fontSize: "16px", fontStyle: "italic", maxWidth: "500px", margin: "0 auto" }}>
          {info}
        </div>
      )}
    </div>
  );
};

export default App;
