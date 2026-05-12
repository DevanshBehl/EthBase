import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { formatUnits } from "viem";

export function WalletAdapter() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (isConnected) {
    return (
      <div className="flex flex-col gap-4">
        {/* status row */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#00d395]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00d395] shadow-[0_0_6px_#00d395] animate-pulse" />
            Connected
          </span>
          {chain && (
            <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#627EEA]/10 border border-[#627EEA]/30 text-[#8fa5f5]">
              {chain.name}
            </span>
          )}
        </div>

        {/* address */}
        <div className="rounded-xl bg-[#0b0c13] border border-[#1e1f2e] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4e6a] mb-1.5">
            Wallet Address
          </p>
          <p className="font-mono text-[12.5px] text-[#dde1f5] break-all leading-relaxed">
            {address}
          </p>
        </div>

        {/* balance */}
        <div className="rounded-xl border border-[#627EEA]/30 bg-gradient-to-br from-[#627EEA]/[0.09] to-transparent p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4e6a] mb-1">
              Balance
            </p>
            <p className="text-3xl font-bold text-[#dde1f5] leading-none flex items-baseline gap-2">
              {balance ? Number(formatUnits(balance.value, balance.decimals)).toFixed(4) : "—"}
              <span className="text-sm font-semibold text-[#627EEA]">ETH</span>
            </p>
          </div>
          {/* Ethereum diamond */}
          <EthDiamond size={36} />
        </div>

        {/* disconnect */}
        <button
          onClick={() => disconnect()}
          className="self-start flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-xl
            bg-[#ff4d6d]/[0.08] border border-[#ff4d6d]/20 text-[#ff4d6d]
            hover:bg-[#ff4d6d]/[0.16] hover:border-[#ff4d6d]/40 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-[#dde1f5]">Connect Wallet</h2>
      <p className="text-sm text-[#4a4e6a]">
        Connect your Ethereum wallet to get started.
      </p>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={status === "pending"}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl
            bg-[#627EEA] text-white font-semibold text-sm
            hover:bg-[#8fa5f5] hover:shadow-[0_0_22px_rgba(98,126,234,0.4)]
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          {status === "pending" ? "Connecting…" : `Connect with ${connector.name}`}
        </button>
      ))}
      {error && (
        <div className="mt-1 text-[13px] rounded-xl px-4 py-3 bg-[#ff4d6d]/[0.08] border border-[#ff4d6d]/20 text-[#ff4d6d]">
          {error.message}
        </div>
      )}
    </div>
  );
}

function EthDiamond({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3L5 17L16 22L27 17L16 3Z" fill="#627EEA" fillOpacity="0.95" />
      <path d="M16 22L5 17L16 29L27 17L16 22Z" fill="#627EEA" />
      <path d="M16 3L16 22L27 17L16 3Z" fill="#8fa5f5" fillOpacity="0.55" />
      <path d="M16 22L16 29L27 17L16 22Z" fill="#8fa5f5" fillOpacity="0.55" />
    </svg>
  );
}
