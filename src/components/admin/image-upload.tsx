"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X, Check } from "lucide-react";

interface ImageUploadProps {
  initialValue?: string;
  name?: string;
}

export function ImageUpload({ initialValue = "", name = "imageUrl" }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(initialValue);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setErrorMessage("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setErrorMessage(data.error || "Erreur lors du téléversement.");
      } else if (data.url) {
        setImageUrl(data.url);
      }
    } catch (err: any) {
      console.error("Erreur upload client:", err);
      setErrorMessage(err?.message || "Erreur de connexion lors du téléversement.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden input storing the actual imageUrl submitted with the form */}
      <input type="hidden" name={name} value={imageUrl} />

      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
        Capture / Image de couverture (Vercel Blob Storage)
      </label>

      {imageUrl ? (
        <div className="relative rounded-2xl bg-black border border-white/[0.12] overflow-hidden group shadow-lg max-w-lg">
          <div className="relative w-full h-56 bg-zinc-950 flex items-center justify-center p-3">
            <Image
              src={imageUrl}
              alt="Aperçu du projet"
              fill
              className={`object-contain p-2 ${
                imageUrl.toLowerCase().includes(".svg")
                  ? "brightness-0 invert drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : ""
              }`}
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          <div className="p-3 bg-[#111116] border-t border-white/[0.08] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate text-xs font-mono text-zinc-400">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{imageUrl}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[11px] font-semibold text-white transition-colors cursor-pointer"
              >
                Remplacer
              </button>
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="p-1 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900/80 transition-colors cursor-pointer"
                title="Supprimer l'image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
            isDragOver
              ? "border-emerald-400 bg-emerald-950/20"
              : "border-white/[0.12] bg-[#0c0c0f] hover:border-white/[0.25] hover:bg-zinc-900/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white">
              {isUploading ? (
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6 text-zinc-400" />
              )}
            </div>

            <div className="space-y-1">
              <span className="text-sm font-bold text-white block">
                {isUploading
                  ? "Téléversement vers Vercel Blob en cours..."
                  : "Glissez votre capture d'écran ici ou cliquez pour choisir"}
              </span>
              <span className="text-xs text-zinc-400 block font-mono">
                PNG, JPG, WebP jusqu&apos;à 5 Mo • Hébergement Vercel Cloud CDN
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Manual URL input fallback toggle */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-zinc-500 font-mono">Ou entrez une URL externe directe :</span>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="flex-1 max-w-sm px-3 py-1.5 rounded-lg bg-black/60 border border-white/[0.08] text-xs text-zinc-300 font-mono focus:outline-none focus:border-emerald-400"
        />
      </div>

      {errorMessage && (
        <p className="text-xs font-semibold text-red-400 bg-red-950/40 border border-red-900/50 p-2.5 rounded-xl">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
