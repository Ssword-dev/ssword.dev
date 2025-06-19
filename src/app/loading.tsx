"use client";
import { Card, CardContent, CardTitle, Skeleton } from "@ssword/ui/client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
export default function LoadingPage() {
  return <Skeleton className="m-1 h-full w-full" />;
}
