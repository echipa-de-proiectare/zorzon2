import React, { useEffect, useState } from "react";

import { useFetchUserProject } from "./useFetchUserProject";
import "@google/model-viewer";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function App() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const { loading, error, project } = useFetchUserProject(token);
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;
  if (!project) {
    // still waiting for data
    return <p>Loading project…</p>;
  }
  const documentAr =
    project.phase[2].item[0].DocumentItem[0].MediaDoc[0].MediaFile.url;
  return (
    <>
      {/* Inline styles transferred from index.html */}
      <style>
        {`/* Hide children until <model-viewer> is defined */
        :not(:defined) > * { display: none; }

        model-viewer {
          width: 100%;
          height: 100%;
          background-color: #eee;
          overflow-x: hidden;
        }

        body, html, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        /* AR button styling */
        #ar-button {
          background-image: url(../../assets/ic_view_in_ar_new_googblue_48dp.png);
          background-repeat: no-repeat;
          background-size: 20px 20px;
          background-position: 12px 50%;
          background-color: #fff;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          bottom: 132px;
          padding: 0px 16px 0px 40px;
          font-family: Roboto, Helvetica Neue, sans-serif;
          font-size: 14px;
          color: #4285f4;
          height: 36px;
          line-height: 36px;
          border-radius: 18px;
          border: 1px solid #dadce0;
        }

        #ar-button:active { background-color: #e8eaed; }
        #ar-button:focus { outline: none; }
        #ar-button:focus-visible { outline: 1px solid #4285f4; }

        @keyframes circle {
          from {
            transform: translateX(-50%) rotate(0deg) translateX(50px) rotate(0deg);
          }
          to {
            transform: translateX(-50%) rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }

        @keyframes elongate {
          from { transform: translateX(100px); }
          to   { transform: translateX(-100px); }
        }

        /* AR prompt styling */
        model-viewer > #ar-prompt {
          position: absolute;
          left: 50%;
          bottom: 175px;
          animation: elongate 2s infinite ease-in-out alternate;
          display: none;
        }
        model-viewer[ar-status="session-started"] > #ar-prompt {
          display: block;
        }
        model-viewer > #ar-prompt > img { animation: circle 4s linear infinite; }

        /* AR failure styling */
        model-viewer > #ar-failure {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 175px;
          display: none;
        }
        model-viewer[ar-tracking="not-tracking"] > #ar-failure {
          display: block;
        }
        `}
      </style>
      {/* Model Viewer element */}
      <model-viewer
        src={`${API_URL}${documentAr}`}
        shadow-intensity="1"
        ar
        camera-controls
        touch-action="pan-y"
        alt="A 3D model carousel"
      >
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>

        <button id="ar-failure">AR is not tracking!</button>
      </model-viewer>
    </>
  );
}

export default App;
