'use client';

import { useRouter } from "next/navigation";
import React, {useEffect} from "react";
import {usePrivy, useWallets} from "@privy-io/react-auth";
import Head from "next/head";
import {MoonPayBuyWidget} from "@moonpay/moonpay-react";
// import {Web3} from "web3";
// import {type RegisteredSubscription} from "web3-eth";

const WALLTE_TO_RECEIVE = '0xbDA77a80b7DD30CA4fFEd8d1C9f9b207a466adcA'

export default function DashboardPage() {
  const router = useRouter();

  // const [web3, setWeb3] = useState< Web3<RegisteredSubscription> | null>(null);

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
    signMessage
  } = usePrivy();

  const { wallets } = useWallets();

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
    // const provider = await wallets[0]?.getEthersProvider();
    // const signer = await provider?.getSigner();
    const value ='9000000000000000';
    //
    // console.log({wallets})
    //
    //
    // const gas: bigint = await web3?.eth.estimateGas({
    //   from: wallet?.address,
    //   to: WALLTE_TO_RECEIVE,
    //   value,
    // });
    //
    // const gasInHex = web3?.utils?.numberToHex(Math.round(Number(gas) * 1.15))
    //
    // const txn = {
    //   from: wallet?.address,
    //   to: WALLTE_TO_RECEIVE,
    //   value,
    //   nonce: Date.now(),
    //   gasPrice: '0x5208',
    //   chainId:5
    // }
    //
    // signer?.sendTransaction(txn).then((completedTxn) => {
    //   console.log(completedTxn);
    // });

    const wallet1 = wallets[0];

    const wallet2 = wallets[1];

    const unsignedTx = {
      to: WALLTE_TO_RECEIVE,
      chainId: 11155111,
      value,
      from: wallet2!.address
    };

    const uiConfig = {
      header: 'Sample header text',
      description: 'Sample description text',
      buttonText: 'Sample button text'
    };


    // const fundResult = await wallet2?.fund()
     await wallet2?.switchChain(11155111);
    // const signResult = await wallet2?.sign('Are you sure?');
    //
    // console.log({ signResult, switchChainResult, wallet2});

    // const signature = await signMessage('Are you sure?', uiConfig);
    console.log({ wallet1})
    // const txReceipt =  await sendTransaction(unsignedTx, uiConfig);
    // console.log({txReceipt})
  }

  return (
    <>
      {/*<Head>*/}
      {/*  <title>Privy Auth Demo</title>*/}
      {/*</Head>*/}

      {/*<main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">*/}
      {/*  {ready && authenticated ? (*/}
      {/*    <>*/}
      {/*      <div className="flex flex-row justify-between">*/}
      {/*        <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>*/}
      {/*        <button*/}
      {/*          onClick={logout}*/}
      {/*          className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"*/}
      {/*        >*/}
      {/*          Logout*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*      <div className="mt-12 flex gap-4 flex-wrap">*/}
      {/*        {googleSubject ? (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  unlinkGoogle(googleSubject);*/}
      {/*                }}*/}
      {/*                className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"*/}
      {/*                disabled={!canRemoveAccount}*/}
      {/*            >*/}
      {/*              Unlink Google*/}
      {/*            </button>*/}
      {/*        ) : (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  linkGoogle();*/}
      {/*                }}*/}
      {/*                className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"*/}
      {/*            >*/}
      {/*              Link Google*/}
      {/*            </button>*/}
      {/*        )}*/}

      {/*        {twitterSubject ? (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  unlinkTwitter(twitterSubject);*/}
      {/*                }}*/}
      {/*                className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"*/}
      {/*                disabled={!canRemoveAccount}*/}
      {/*            >*/}
      {/*              Unlink Twitter*/}
      {/*            </button>*/}
      {/*        ) : (*/}
      {/*            <button*/}
      {/*                className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"*/}
      {/*                onClick={() => {*/}
      {/*                  linkTwitter();*/}
      {/*                }}*/}
      {/*            >*/}
      {/*              Link Twitter*/}
      {/*            </button>*/}
      {/*        )}*/}

      {/*        {discordSubject ? (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  unlinkDiscord(discordSubject);*/}
      {/*                }}*/}
      {/*                className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"*/}
      {/*                disabled={!canRemoveAccount}*/}
      {/*            >*/}
      {/*              Unlink Discord*/}
      {/*            </button>*/}
      {/*        ) : (*/}
      {/*            <button*/}
      {/*                className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"*/}
      {/*                onClick={() => {*/}
      {/*                  linkDiscord();*/}
      {/*                }}*/}
      {/*            >*/}
      {/*              Link Discord*/}
      {/*            </button>*/}
      {/*        )}*/}

      {/*        {email ? (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  unlinkEmail(email.address);*/}
      {/*                }}*/}
      {/*                className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"*/}
      {/*                disabled={!canRemoveAccount}*/}
      {/*            >*/}
      {/*              Unlink email*/}
      {/*            </button>*/}
      {/*        ) : (*/}
      {/*            <button*/}
      {/*                onClick={linkEmail}*/}
      {/*                className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"*/}
      {/*            >*/}
      {/*              Connect email*/}
      {/*            </button>*/}
      {/*        )}*/}
      {/*        {wallet ? (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  unlinkWallet(wallet.address);*/}
      {/*                }}*/}
      {/*                className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"*/}
      {/*                disabled={!canRemoveAccount}*/}
      {/*            >*/}
      {/*              Unlink wallet*/}
      {/*            </button>*/}
      {/*        ) : (*/}
      {/*            <button*/}
      {/*                onClick={linkWallet}*/}
      {/*                className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"*/}
      {/*            >*/}
      {/*              Connect wallet*/}
      {/*            </button>*/}
      {/*        )}*/}
      {/*        {phone ? (*/}
      {/*            <button*/}
      {/*                onClick={() => {*/}
      {/*                  unlinkPhone(phone.number);*/}
      {/*                }}*/}
      {/*                className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"*/}
      {/*                disabled={!canRemoveAccount}*/}
      {/*            >*/}
      {/*              Unlink phone*/}
      {/*            </button>*/}
      {/*        ) : (*/}
      {/*            <button*/}
      {/*                onClick={linkPhone}*/}
      {/*                className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"*/}
      {/*            >*/}
      {/*              Connect phone*/}
      {/*            </button>*/}
      {/*        )}*/}
      {/*        <button onClick={() => sendTestTransaction()} disabled={!wallets[0]}>Send Transaction</button>*/}
      {/*      </div>*/}

      {/*      <p className="mt-6 font-bold uppercase text-sm text-gray-600">*/}
      {/*      User object*/}
      {/*      </p>*/}
      {/*      <textarea*/}
      {/*        value={JSON.stringify(user, null, 2)}*/}
      {/*        className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"*/}
      {/*        rows={20}*/}
      {/*        disabled*/}
      {/*      />*/}
      {/*    </>*/}
      {/*  ) : null}*/}
      {/*</main>*/}
      <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          visible
      />
    </>
  );
}
