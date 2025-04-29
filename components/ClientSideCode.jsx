"use client";

import { useState } from "react";

const tabs = [
  { label: "Node.js", value: "node" },
  { label: "Python", value: "python" },
];

const codeMap = {
  node: `// client.js
const axios = require('axios');

async function callUploadAPI(apiKey) {
  try {
    const response = await axios.get(\`http://localhost:3000/api/use/\${apiKey}/data\`); // use your api key 
    
    console.log('Success:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Request failed:', error.message);
    }
  }
}

callUploadAPI('db03ec05-0a56-451d-b59a-fd7b65ebd3f1');
`,
  python: `# Python client example
import requests

def callUploadAPI(apiKey): 
  
    response = requests.get(f'http://localhost:3000/api/use/{apiKey}/data')
        
    print(response.json())

callUploadAPI('db03ec05-0a56-451d-b59a-fd7b65ebd3f1') # use your api key 
`,
};

export default function ClientConnectCode() {
  const [selected, setSelected] = useState("node");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeMap[selected]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelected(tab.value)}
            className={`px-4 py-2 rounded ${
              selected === tab.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="bg-gray-900 text-white p-4 rounded-xl overflow-auto">
          <code>{codeMap[selected]}</code>
        </pre>
      </div>
    </div>
  );
}
