"use client";
import { useState } from 'react';

export default function AIBotMusicPage() {
  const [request, setRequest] = useState('');
  const [band, setBand] = useState('');
  const [genre, setGenre] = useState('');
  const [subgenre, setSubgenre] = useState('');

  const bands = ['Band 1', 'Band 2', 'Band 3']; // Replace with actual band names
  const genres = ['Rock', 'Pop', 'Jazz']; // Replace with actual genres
  const subgenres = ['Indie', 'Funk', 'Blues']; // Replace with actual subgenres

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({ request, band, genre, subgenre });
    // Add logic to send this data to your AI backend
  };

  return (
      <div className="max-w-lg mx-auto p-6 bg-background rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-text mb-6">AI Conversation Bot</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="request" className="block text-sm font-medium text-text-alt mb-2">
              Request (50 words max):
            </label>
            <textarea
                id="request"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                maxLength={250}
                placeholder="Enter your request..."
                required
                className="w-full p-2 border border-background-alt rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="band" className="block text-sm font-medium text-text-alt mb-2">
              Choose a Band:
            </label>
            <select
                id="band"
                value={band}
                onChange={(e) => setBand(e.target.value)}
                required
                className="w-full p-2 border border-background-alt rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              <option value="">Select a band</option>
              {bands.map((band, index) => (
                  <option key={index} value={band}>
                    {band}
                  </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium text-text-alt mb-2">
              Choose a Genre:
            </label>
            <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="w-full p-2 border border-background-alt rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              <option value="">Select a genre</option>
              {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="subgenre" className="block text-sm font-medium text-text-alt mb-2">
              Choose a Subgenre:
            </label>
            <select
                id="subgenre"
                value={subgenre}
                onChange={(e) => setSubgenre(e.target.value)}
                required
                className="w-full p-2 border border-background-alt rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              <option value="">Select a subgenre</option>
              {subgenres.map((subgenre, index) => (
                  <option key={index} value={subgenre}>
                    {subgenre}
                  </option>
              ))}
            </select>
          </div>

          <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-text-alt font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
          >
            Submit
          </button>
        </form>
      </div>
  );
}
