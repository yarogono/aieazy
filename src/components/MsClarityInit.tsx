"use client"
import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function useMsClarity() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const msClarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

        if (!msClarityId) return;
        
        Clarity.init(msClarityId!);
      }, []);
    
    return null;
}