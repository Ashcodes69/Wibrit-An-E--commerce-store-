"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Myaccount() {
    const router = useRouter();
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }, [router]);
  return (
    <div>Myaccount</div>
  )
}

export default Myaccount