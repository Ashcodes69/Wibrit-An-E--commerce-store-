"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

function TopLoadingBar() {
  const pathname = usePathname();

  const ref = useRef<React.ElementRef<typeof LoadingBar>>(null);

  useEffect(() => {
    if (!pathname) return;

    ref.current?.continuousStart();

    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 600);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <LoadingBar color="#9333ea" ref={ref} height={3} />;
}

export default TopLoadingBar;
