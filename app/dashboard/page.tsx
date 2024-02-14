'use client';

import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {usePrivy, useWallets} from "@privy-io/react-auth";
import Head from "next/head";
// import {MoonPayBuyWidget} from "@moonpay/moonpay-react";
// import {Web3} from "web3";
// import {type RegisteredSubscription} from "web3-eth";
import {mainnet, goerli, sepolia, bsc, bscTestnet, polygon, polygonMumbai} from 'viem/chains';
import Select from 'react-select';

// const WALLET_TO_RECEIVE = '0x04F623989Ad25FbcCf88F6e052A260C92770b766'
const WALLET_TO_RECEIVE = '0xbDA77a80b7DD30CA4fFEd8d1C9f9b207a466adcA'

interface OptionType    {
    value: string | number
    label: string
}

const options:OptionType[] = [
    {
        value: mainnet.id,
        label: mainnet.name
    },
    {
        value: sepolia.id,
        label: sepolia.nativeCurrency.name
    },
    {
        value: goerli.id,
        label: goerli.nativeCurrency.name
    },
    {
        value: bsc.id,
        label: bsc.name
    },
    {
        value: bscTestnet.id,
        label: bscTestnet.name
    },
    {
        value: polygon.id,
        label: polygon.name
    },
    {
        value: polygonMumbai.id,
        label: polygonMumbai.name
    },
]

export default function DashboardPage() {
    const router = useRouter();

    // const [web3, setWeb3] = useState< Web3<RegisteredSubscription> | null>(null);
    const [selectedChainId, setSelectedChainId] = useState(options[0].value);
    const [selectedWallet, setSelectedWallet] = useState<OptionType | null>(null);

    const {
        ready,
        authenticated,
        user,
        logout,
        linkEmail,
        linkWallet,
        unlinkEmail,
        linkPhone,
        unlinkPhone,
        unlinkWallet,
        linkGoogle,
        unlinkGoogle,
        linkTwitter,
        unlinkTwitter,
        linkDiscord,
        unlinkDiscord,
        sendTransaction,
        // signMessage
    } = usePrivy();

    const {wallets} = useWallets();

    useEffect(() => {
        if (ready && !authenticated) {
            router.push("/");
        }
    }, [ready, authenticated, router]);

    // useEffect(() => {
    //
    //   if (window.ethereum) {
    //     const web3Instance = new Web3(window.ethereum);
    //     setWeb3(web3Instance);
    //   }
    // }, []);

    const numAccounts = user?.linkedAccounts?.length || 0;
    const canRemoveAccount = numAccounts > 1;

    const email = user?.email;
    const phone = user?.phone;
    const wallet = user?.wallet;

    const googleSubject = user?.google?.subject || null;
    const twitterSubject = user?.twitter?.subject || null;
    const discordSubject = user?.discord?.subject || null;

    async function sendTestTransaction() {
        const value = 900000000000000n;
        const currentWallet = wallets.find(wallet => wallet.address === selectedWallet?.value as string);

        const unsignedTx = {
            to: WALLET_TO_RECEIVE,
            chainId: selectedChainId as number,
            value,
            from: selectedWallet?.value  as string
        };

        const uiConfig = {
            header: 'Sample header text',
            description: 'Sample description text',
            buttonText: 'Sample button text'
        };

        // const fundResult = await wallet2?.fund()
        // const signResult = await wallet2?.sign('Are you sure?');
        await currentWallet?.switchChain(selectedChainId as number);

        // const signature = await signMessage('Are you sure?', uiConfig);
        const txReceipt = await sendTransaction(unsignedTx, uiConfig);
        console.log({txReceipt})
    }

    return (
        <>
            <Head>
                <title>Privy Auth Demo</title>
            </Head>

            <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
                {ready && authenticated ? (
                    <>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>
                            <button
                                onClick={logout}
                                className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
                            >
                                Logout
                            </button>
                        </div>
                        <div className="mt-12 flex gap-4 flex-wrap">
                            {googleSubject ? (
                                <button
                                    onClick={() => {
                                        unlinkGoogle(googleSubject);
                                    }}
                                    className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={!canRemoveAccount}
                                >
                                    Unlink Google
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        linkGoogle();
                                    }}
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                                >
                                    Link Google
                                </button>
                            )}

                            {twitterSubject ? (
                                <button
                                    onClick={() => {
                                        unlinkTwitter(twitterSubject);
                                    }}
                                    className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={!canRemoveAccount}
                                >
                                    Unlink Twitter
                                </button>
                            ) : (
                                <button
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                                    onClick={() => {
                                        linkTwitter();
                                    }}
                                >
                                    Link Twitter
                                </button>
                            )}

                            {discordSubject ? (
                                <button
                                    onClick={() => {
                                        unlinkDiscord(discordSubject);
                                    }}
                                    className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={!canRemoveAccount}
                                >
                                    Unlink Discord
                                </button>
                            ) : (
                                <button
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                                    onClick={() => {
                                        linkDiscord();
                                    }}
                                >
                                    Link Discord
                                </button>
                            )}

                            {email ? (
                                <button
                                    onClick={() => {
                                        unlinkEmail(email.address);
                                    }}
                                    className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={!canRemoveAccount}
                                >
                                    Unlink email
                                </button>
                            ) : (
                                <button
                                    onClick={linkEmail}
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                                >
                                    Connect email
                                </button>
                            )}
                            {wallet ? (
                                <button
                                    onClick={() => {
                                        unlinkWallet(wallet.address);
                                    }}
                                    className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={!canRemoveAccount}
                                >
                                    Unlink wallet
                                </button>
                            ) : (
                                <button
                                    onClick={linkWallet}
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                                >
                                    Connect wallet
                                </button>
                            )}
                            {phone ? (
                                <button
                                    onClick={() => {
                                        unlinkPhone(phone.number);
                                    }}
                                    className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={!canRemoveAccount}
                                >
                                    Unlink phone
                                </button>
                            ) : (
                                <button
                                    onClick={linkPhone}
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                                >
                                    Connect phone
                                </button>
                            )}
                            <button onClick={() => sendTestTransaction()} disabled={!wallets[0]}>Send Transaction
                            </button>
                            {/*<button*/}
                            {/*    onClick={()=>router.push('/moonpay')}*/}
                            {/*    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"*/}
                            {/*>*/}
                            {/*  Top Up*/}
                            {/*</button>*/}
                            <Select
                                onChange={(value) => {
                                    setSelectedChainId(value.value);
                                }}
                                options={options}
                                className="w-[200px]"
                                placeholder='Select Chain'

                            />
                            <Select
                                className="w-[200px]"
                                onChange={(wallet) => {
                                    setSelectedWallet(wallet)
                                }}
                                placeholder='Select Wallet'
                                options={wallets.map(wallet => ({value: wallet.address, label: wallet.walletClientType}))}
                            />
                        </div>

                        <p className="mt-6 font-bold uppercase text-sm text-gray-600">
                            User object
                        </p>
                        <textarea
                            value={JSON.stringify(user, null, 2)}
                            className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"
                            rows={20}
                            disabled
                        />
                    </>
                ) : null}
            </main>
        </>
    );
}
