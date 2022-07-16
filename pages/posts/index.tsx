import React, { useEffect } from "react";
import { useRouter } from "next/router";
export const Index = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    });
    return;
};

export default Index;
