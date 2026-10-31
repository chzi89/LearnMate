"use client";

import React, { useState } from "react";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "events", "trips", "hifz"];

  const photos = [
    {
      id: 1,
      category: "hifz",
      title: "Hifz Class",
      url: "/hifz-class.jpg",
    },
    {
      id: 2,
      category: "hifz",
      title: "Hifz Ceremony",
      url: "/hifz.jpg",
    },
    {
      id: 3,
      category: "events",
      title: "Farewell Gathering",
      url: "/fearwell.jpg",
    },
    {
      id: 4,
      category: "trips",
      title: "Educational Trip",
      url: "/school-event-1.jpg",
    },
    {
      id: 5,
      category: "trips",
      title: "Visit to the Monument",
      url: "/school-event-2.jpg",
    },
    {
      id: 6,
      category: "trips",
      title: "Outdoor Learning Session",
      url: "/school-event-3.jpg",
    },
    {
      id: 7,
      category: "trips",
      title: "Martyrs' Memorial Visit",
      url: "/school-event-4.jpg",
    },
  ];

  const filteredPhotos =
    filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-pphs-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            School Gallery
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            A glimpse into the vibrant life at Punjab Public High School — where
            learning meets creativity and discipline.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <p className="mb-8 text-center text-sm text-slate-500">
          Photographs from school events, trips, and Hifz classes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === cat
                  ? "bg-pphs-navy text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-3xl bg-slate-100 aspect-square transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pphs-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold text-lg">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
