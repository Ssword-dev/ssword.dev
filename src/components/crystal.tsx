"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
type CrystalProps = {
  color: string;
  children: ReactNode;
};

const Crystal: React.FC<CrystalProps> = ({ color, children }) => (
  <motion.svg>
    <path d="" />
  </motion.svg>
);

export default Crystal;
