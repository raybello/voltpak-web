"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductConfiguratorProps {
  onClose: () => void;
}

export function ProductConfigurator({ onClose }: ProductConfiguratorProps) {
  const [selectedOptions, setSelectedOptions] = useState({
    color: "black",
    battery: "standard",
    accessories: [] as string[],
    warranty: "standard",
  });

  const options = {
    color: [
      { id: "black", name: "Midnight Black", price: 0, available: true },
      { id: "gray", name: "Space Gray", price: 0, available: true },
      { id: "blue", name: "Electric Blue", price: 99, available: false },
    ],
    battery: [
      {
        id: "standard",
        name: "Standard 2048Wh",
        price: 0,
        description: "LiFePO4 battery pack",
      },
      {
        id: "extended",
        name: "Extended 4096Wh",
        price: 899,
        description: "Dual battery configuration",
      },
      {
        id: "pro",
        name: "Pro 6144Wh",
        price: 1599,
        description: "Triple battery setup",
      },
    ],
    accessories: [
      { id: "solar", name: "400W Solar Panel", price: 599 },
      { id: "case", name: "Professional Carrying Case", price: 199 },
      { id: "cables", name: "Extended Cable Kit", price: 89 },
      { id: "mount", name: "Vehicle Mount Kit", price: 149 },
    ],
    warranty: [
      { id: "standard", name: "2-Year Standard", price: 0 },
      { id: "extended", name: "4-Year Extended", price: 299 },
      { id: "pro", name: "6-Year Pro Support", price: 599 },
    ],
  };

  const calculateTotal = () => {
    let total = 2499; // Base price

    // Add color premium
    const colorOption = options.color.find(
      (c) => c.id === selectedOptions.color
    );
    if (colorOption) total += colorOption.price;

    // Add battery upgrade
    const batteryOption = options.battery.find(
      (b) => b.id === selectedOptions.battery
    );
    if (batteryOption) total += batteryOption.price;

    // Add accessories
    selectedOptions.accessories.forEach((accessoryId) => {
      const accessory = options.accessories.find((a) => a.id === accessoryId);
      if (accessory) total += accessory.price;
    });

    // Add warranty
    const warrantyOption = options.warranty.find(
      (w) => w.id === selectedOptions.warranty
    );
    if (warrantyOption) total += warrantyOption.price;

    return total;
  };

  const toggleAccessory = (accessoryId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter((id) => id !== accessoryId)
        : [...prev.accessories, accessoryId],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 rounded-2xl border border-blue-500/20 max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full">
          {/* 3D Viewer */}
          <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 relative">
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                3D Configurator
              </Badge>
            </div>

            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/30 text-white hover:bg-black/50"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/30 text-white hover:bg-black/50"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/30 text-white hover:bg-black/50"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/30 text-white hover:bg-black/50"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* 3D Model Placeholder */}
            <iframe
              src="https://my.spline.design/untitled-HuXUxdMS3667bBCukDfvP05V/"
              frameBorder="0"
              width="100%"
              height="100%"
            ></iframe>

            <div className="absolute bottom-4 left-4 right-4"></div>
          </div>

          {/* Configuration Panel */}
          <div className="w-96 bg-slate-800/50 backdrop-blur-md border-l border-blue-500/20 0">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Configure Your VoltPak
                </h2>
                <p className="text-sm text-blue-200">
                  Customize your power station to match your needs
                </p>
              </div>

              <Separator className="bg-blue-500/20" />

              {/* Battery Configuration */}
              <div>
                <h3 className="font-semibold text-white mb-3">
                  Battery Capacity
                </h3>
                <div className="space-y-2">
                  {options.battery.map((battery) => (
                    <motion.div
                      key={battery.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedOptions.battery === battery.id
                          ? "border-blue-400 bg-blue-500/10"
                          : "border-blue-500/20 hover:border-blue-400/40"
                      }`}
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          battery: battery.id,
                        }))
                      }
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">
                          {battery.name}
                        </span>
                        {battery.price > 0 && (
                          <span className="text-green-400">
                            +${battery.price}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-blue-200">
                        {battery.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Separator className="bg-blue-500/20" />

              {/* Accessories */}
              <div>
                <h3 className="font-semibold text-white mb-3">Accessories</h3>
                <div className="space-y-2">
                  {options.accessories.map((accessory) => (
                    <motion.div
                      key={accessory.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedOptions.accessories.includes(accessory.id)
                          ? "border-green-400 bg-green-500/10"
                          : "border-blue-500/20 hover:border-blue-400/40"
                      }`}
                      onClick={() => toggleAccessory(accessory.id)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{accessory.name}</span>
                        <span className="text-green-400">
                          +${accessory.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Separator className="bg-blue-500/20" />

              {/* Warranty */}
              <div>
                <h3 className="font-semibold text-white mb-3">Warranty</h3>
                <div className="space-y-2">
                  {options.warranty.map((warranty) => (
                    <motion.div
                      key={warranty.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedOptions.warranty === warranty.id
                          ? "border-blue-400 bg-blue-500/10"
                          : "border-blue-500/20 hover:border-blue-400/40"
                      }`}
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          warranty: warranty.id,
                        }))
                      }
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{warranty.name}</span>
                        {warranty.price > 0 && (
                          <span className="text-green-400">
                            +${warranty.price}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  Add to Cart - ${calculateTotal().toLocaleString()}
                </Button>
                {/* <div className="space-y-3 pt-4">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  Add to Cart - ${calculateTotal().toLocaleString()}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-400/30 text-blue-300 hover:bg-blue-600/20 bg-transparent"
                >
                  Save Configuration
                </Button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
