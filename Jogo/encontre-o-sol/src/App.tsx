import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useSound from 'use-sound';
import celebrateSfx from '@/assets/sounds/celebrate.mp3';
import errorSfx from '@/assets/sounds/error.mp3';
import sparkleGif from '@/assets/images/sparkle.gif';

const images = [
  { id: "sol", label: "Sol", x: 100, y: 150 },
  { id: "nuvem", label: "Nuvem", x: 300, y: 100 },
  { id: "lua", label: "Lua", x: 500, y: 120 },
  { id: "estrela", label: "Estrela", x: 200, y: 250 },
  { id: "arvore", label: "Árvore", x: 400, y: 300 },
  { id: "montanha", label: "Montanha", x: 600, y: 350 }
];

export default function EncontreOSol() {
  const [found, setFound] = useState(false);
  const [playCelebrate] = useSound(celebrateSfx);
  const [playError] = useSound(errorSfx);

  const handleClick = (id: string) => {
    if (id === "sol") {
      setFound(true);
      playCelebrate();
    } else {
      playError();
    }
  };

  return (
    <div className="relative w-full h-screen bg-sky-200 overflow-hidden">
      {/* Grama e flores */}
      <div className="absolute bottom-0 w-full h-40 bg-green-400 flex justify-around items-end">
        <div className="w-5 h-5 bg-pink-400 rounded-full"></div>
        <div className="w-5 h-5 bg-yellow-300 rounded-full"></div>
        <div className="w-5 h-5 bg-red-400 rounded-full"></div>
      </div>

      {/* Itens clicáveis */}
      {images.map((img) => (
        <motion.div
          key={img.id}
          className="absolute cursor-pointer"
          style={{ top: img.y, left: img.x }}
          whileHover={{ scale: 1.1 }}
          onClick={() => handleClick(img.id)}
        >
          <div
            className={\`w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg \${img.id === "sol" && found ? "bg-yellow-400" : "bg-gray-500"}\`}
          >
            {img.id === "sol" && found ? "🌞" : img.label}
          </div>
        </motion.div>
      ))}

      {/* Reação de acerto */}
      {found && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={sparkleGif}
            alt="Sparkles"
            className="absolute w-full h-full object-cover pointer-events-none opacity-60"
          />
          <div className="text-2xl font-bold z-20">Parabéns! Você encontrou o Sol!</div>
          <div className="flex items-center gap-6 z-20">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-pink-300 rounded-full flex items-center justify-center text-center text-xs font-bold p-2">
                Luluca 🧒🏻<br />óculos rosa<br />vestido e tênis coloridos
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-yellow-700 rounded-full flex items-center justify-center text-center text-xs font-bold p-2">
                Nescau 🐶<br />Shitzu<br />pelagem marrom escuro
              </div>
            </div>
          </div>
          <Button onClick={() => setFound(false)}>Jogar novamente</Button>
        </motion.div>
      )}
    </div>
  );
}
