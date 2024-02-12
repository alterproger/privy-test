'use client'

import {useRouter} from "next/navigation";
import {MoonPayBuyWidget} from "@moonpay/moonpay-react";

const Page = () => {
    const router = useRouter()

    return (
        <>
            <button
                onClick={() => router.push('/dashboard')}
                className="text-sm uppercase bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
            >
                back to dashboard
            </button>
            <MoonPayBuyWidget
                variant="overlay"
                baseCurrencyCode="usd"
                baseCurrencyAmount="100"
                defaultCurrencyCode="eth"
                visible
            />
        </>
    );
};

export default Page;