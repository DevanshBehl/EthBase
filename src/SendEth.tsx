import { useState } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

export function SendEth() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendTransaction({ to: to as `0x${string}`, value: parseEther(amount) });
  };

  const busy = isPending || isConfirming;

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-4">
      {/* recipient */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4e6a]">
          Recipient Address
        </label>
        <input
          className="w-full rounded-xl bg-[#0b0c13] border border-[#1e1f2e] px-4 py-3
            text-sm text-[#dde1f5] placeholder-[#4a4e6a] outline-none font-mono
            focus:border-[#627EEA]/50 focus:ring-2 focus:ring-[#627EEA]/20 transition"
          placeholder="0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      {/* amount */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4e6a]">
          Amount (ETH)
        </label>
        <div className="relative">
          <input
            className="w-full rounded-xl bg-[#0b0c13] border border-[#1e1f2e] px-4 py-3 pr-16
              text-sm text-[#dde1f5] placeholder-[#4a4e6a] outline-none
              focus:border-[#627EEA]/50 focus:ring-2 focus:ring-[#627EEA]/20 transition"
            placeholder="0.0"
            value={amount}
            type="number"
            step="any"
            min="0"
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#627EEA]">
            ETH
          </span>
        </div>
      </div>

      {/* submit */}
      <button
        type="submit"
        disabled={busy}
        className="w-full py-3 rounded-xl bg-[#627EEA] text-white font-semibold text-sm
          hover:bg-[#8fa5f5] hover:shadow-[0_0_22px_rgba(98,126,234,0.4)]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Spinner /> Confirm in wallet…
          </>
        ) : isConfirming ? (
          <>
            <Spinner /> Broadcasting…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Send ETH
          </>
        )}
      </button>

      {/* tx hash */}
      {hash && (
        <div className="rounded-xl p-4 bg-[#00d395]/[0.07] border border-[#00d395]/20 flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-[#00d395] uppercase tracking-wider">
            {isConfirmed ? "Confirmed" : "Submitted"}
          </span>
          <span className="font-mono text-[11px] text-[#00d395]/70 break-all">{hash}</span>
        </div>
      )}

      {/* error */}
      {error && (
        <div className="rounded-xl p-4 bg-[#ff4d6d]/[0.07] border border-[#ff4d6d]/20 text-[13px] text-[#ff4d6d]">
          {error.message}
        </div>
      )}
    </form>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
