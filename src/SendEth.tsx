import { useState } from "react";
import { useSendTransaction , useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export function SendEth(){
    const [to , setTo] = useState('');
    const [amount , setAmount] = useState('');
    const {sendTransaction , data:hash , isPending , error} = useSendTransaction();

    const {isLoading : isConfirming , isSuccess :isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const handleSend = (e: React.FormEvent)=>{
        e.preventDefault()
        sendTransaction({
            to: to as `0x${string}`,
            value:parseEther(amount)
        })
    }


    return (<div>
        <h3>Send Ethereum</h3>
        <form onSubmit={handleSend}>
            <input placeholder="Address" value = {to} onChange={(e)=>setTo(e.target.value)} />
            <input placeholder="Amount " value={amount} type = "number" onChange={(e)=>setAmount(e.target.value)}/>
            <button
                disabled={isConfirming || isPending}
                type="submit"
            >{isPending? "Confirming ...." : isConfirming ? "Waiting ...." :"Send"}</button>
        </form>

        {hash && <p>Transaction Hash : {hash}</p>}
        {isConfirmed && <p>Success..</p>}
        {error && <p>Error : {error.message}</p>}
    </div>)
}