"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function SignatureTabs() {
  const [activeTab, setActiveTab] = useState('draw');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    if (activeTab === 'draw') {
      initializeCanvas();
    }
  }, [activeTab]);

  const [isChecked, setIsChecked] = useState(true);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctxRef.current = ctx;
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !ctxRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    if (ctxRef.current) {
      ctxRef.current.closePath();
    }
  };

  const clearCanvas = () => {
    if (ctxRef.current && canvasRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'signature.png';
      link.click();
    }
  };

  const saveTypedSignature = (typedSignature: string) => {
    if (typedSignature.trim()) {
      const blob = new Blob([typedSignature], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'typed_signature.txt';
      link.click();
    } else {
      alert('Please type your signature before saving.');
    }
  };

  return (
    <>
      <div className="w-full mt-2 page-main">
        <div className="w-[90%] m-auto pt-10 pb-20 ps-20 text-white bg-[#002366] rounded-[50px] pagetop">
          <h1 className="text-[40px] font-extrabold">Review Details</h1>
          <p className="text-[30px]">Consulter le document contractuel pour votre location !</p>
        </div>

        <div className="w-[80%] m-auto mt-[-40px] bg-[#fff] rounded-xl p-16 shadow-lg page-section-second">
          <div className="w-[80%] m-auto  bg-white p-6 rounded-lg">
            <div className="max-w-lg m-auto flex border-b mb-4 bg-[#00236633] rounded-[15px] ">
              <button
                className={`flex-1 py-2 text-center rounded-[15px] ${
                  activeTab === 'draw' ? 'bg-wing-blue font-bold  text-white ' : ' text-wing-blue'
                }`}
                onClick={() => setActiveTab('draw')}
              >
                Draw Signature
              </button>
              <button
                className={`flex-1 py-2 text-center rounded-[15px] ${
                  activeTab === 'type' ? 'bg-wing-blue font-bold text-white' : 'text-wing-blue'
                }`}
                onClick={() => setActiveTab('type')}
              >
                Type Signature
              </button>
            </div>

            {activeTab === 'draw' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Draw Your Signature</h2>
                <canvas
                  ref={canvasRef}
                  className="border-dashed border-2 border-wing-blue rounded w-full bg-[#00236633] rounded-[15px]  "
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                ></canvas>
                <div className="flex items-center gap-2 mt-4">
      <button
        onClick={toggleCheck}
        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors duration-300 ${
          isChecked ? 'bg-wing-blue border-wing-blue' : 'bg-gray-200 border-gray-400'
        }`}
      >
        {isChecked && (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </button>
      <p>I agree to <Link href={"../privacyPolicy"} className='text-wing-blue font-bold '>Term & Condition</Link></p>
    </div>
    
                <div className="flex justify-between mt-4">
                  <button
                    onClick={clearCanvas}
                    className="bg-wing-orange text-white px-4 py-2 rounded"
                  >
                    Clear
                  </button>
                  <button
                    onClick={saveCanvas}
                    className="bg-wing-blue text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'type' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Type Your Signature</h2>
                <input
                  type="text"
                  id="typedSignature"
                  placeholder="Type your signature here..."
                  className="w-full p-2 border rounded mb-4"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('typedSignature') as HTMLInputElement;
                    if (input) {
                      saveTypedSignature(input.value);
                    }
                  }}
                  className="bg-wing-blue text-white px-4 py-2 rounded "
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}