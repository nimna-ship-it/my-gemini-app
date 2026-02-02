
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setIsProcessing(true);
    const result = await GeminiService.editImage(image, mimeType, prompt);
    if (result) {
      setEditedImage(result);
    }
    setIsProcessing(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl w-full max-w-lg border border-pink-100 flex flex-col gap-4">
      <h3 className="text-pink-600 font-romantic text-2xl border-b border-pink-100 pb-2">Magic Image Studio</h3>
      <p className="text-xs text-pink-400">Upload a photo and tell the AI to change it! (e.g., "Add hearts", "Make it vintage")</p>
      
      {!image ? (
        <div className="border-2 border-dashed border-pink-200 rounded-2xl h-48 flex flex-col items-center justify-center text-pink-300 hover:text-pink-400 hover:border-pink-300 transition-all cursor-pointer relative">
          <i className="fa-solid fa-cloud-arrow-up text-4xl mb-2"></i>
          <span>Click to Upload Love Memory</span>
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
        </div>
      ) : (
        <div className="relative group rounded-2xl overflow-hidden">
          <img src={editedImage || image} className="w-full h-auto max-h-[300px] object-contain rounded-2xl" alt="Preview" />
          <button 
            onClick={() => { setImage(null); setEditedImage(null); }}
            className="absolute top-2 right-2 bg-white/50 hover:bg-white p-2 rounded-full text-pink-600 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {image && (
        <div className="flex flex-col gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What should I do with this image? ✨"
            className="bg-pink-50 border border-pink-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-300 resize-none h-20"
          />
          <button
            onClick={handleEdit}
            disabled={isProcessing || !prompt}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-all disabled:bg-pink-300 shadow-lg shadow-pink-100"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-sparkles animate-spin"></i> Processing Magic...
              </span>
            ) : "Apply Magic Edit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
