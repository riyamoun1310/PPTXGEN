import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [guidance, setGuidance] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDownloading(true);
    const formData = new FormData();
    formData.append('text', text);
    formData.append('guidance', guidance);
    formData.append('api_key', apiKey);
    formData.append('pptx_file', file);
    try {
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Failed to generate presentation');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated.pptx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
    setDownloading(false);
  };

  return (
    <div className="container py-4">
      <h2>Text to PowerPoint Generator</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label className="form-label">Paste your text or markdown</label>
          <textarea className="form-control" rows={8} value={text} onChange={e => setText(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Guidance (optional)</label>
          <input className="form-control" value={guidance} onChange={e => setGuidance(e.target.value)} placeholder="e.g. investor pitch deck" />
        </div>
        <div className="mb-3">
          <label className="form-label">LLM API Key</label>
          <input className="form-control" type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload PowerPoint template (.pptx or .potx)</label>
          <input className="form-control" type="file" accept=".pptx,.potx" onChange={e => setFile(e.target.files[0])} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" type="submit" disabled={downloading}>
          {downloading ? 'Generating...' : 'Generate Presentation'}
        </button>
      </form>
      <div className="alert alert-info">
        Your API key and files are never stored. All processing is local or in-memory.
      </div>
    </div>
  );
}

export default App;
