'use client';


import {MoonPayProvider} from "@moonpay/moonpay-react";

export default function MoonPayProviderWrapper({
                                                 children,
                                             }: {
    children: React.ReactNode;
}) {
    return (
        <MoonPayProvider
            apiKey={process.env.NEXT_PUBLIC_MOONPAY_APP_ID || ""}
            debug
            environment="sandbox"
        >
            {children}
        </MoonPayProvider>
    );
}
