'use client';


import {MoonPayProvider} from "@moonpay/moonpay-react";

export default function MoonPayProviderWrapper({
                                                 children,
                                             }: {
    children: React.ReactNode;
}) {
    return (
        <MoonPayProvider
            apiKey="pk_test_7xH7TvLqbVOivrZV7Nqk7jtXSyGqJ4Qc"
            debug
            environment="sandbox"
        >
            {children}
        </MoonPayProvider>
    );
}
