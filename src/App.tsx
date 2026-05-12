import { useAccount } from "wagmi";
import { WalletAdapter } from "./WalletAdapter";
import { SendEth } from "./SendEth";

function EthLogo({ size = 40, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 417"
      fill="none"
      style={glow ? { filter: "drop-shadow(0 0 18px rgba(98,126,234,0.65))" } : undefined}
    >
      <polygon fill="#343434" points="127.9611,0 125.1661,9.5 125.1661,285.168 127.9611,287.958 255.9231,212.32" />
      <polygon fill="#8C8C8C" points="127.9611,0 0,212.32 127.9611,287.958 127.9611,154.158" />
      <polygon fill="#3C3C3B" points="127.9611,312.1866 126.3861,314.1066 126.3861,412.3056 127.9611,416.9066 255.9991,236.5866" />
      <polygon fill="#8C8C8C" points="127.9611,416.9066 127.9611,312.1866 0,236.5866" />
      <polygon fill="#141414" points="127.9611,287.9577 255.9221,212.3207 127.9611,154.1587" />
      <polygon fill="#393939" points="0.0009,212.3207 127.9609,287.9577 127.9609,154.1587" />
    </svg>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer border
        ${
          active
            ? "bg-[#627EEA]/15 border-[#627EEA]/30 text-[#8fa5f5]"
            : "bg-transparent border-transparent text-[#4a4e6a] hover:text-[#8a90b0] hover:bg-white/[0.03]"
        }`}
    >
      <span className={active ? "text-[#627EEA]" : ""}>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-[#11121c] border border-[#1e1f2e] p-5 flex flex-col gap-1 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#627EEA]/30 to-transparent" />
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4e6a]">{label}</p>
      <p className="text-xl font-bold text-[#dde1f5]">{value}</p>
      {sub && <p className="text-xs text-[#4a4e6a]">{sub}</p>}
    </div>
  );
}

export default function App() {
  const { isConnected, address } = useAccount();

  return (
    <div className="min-h-screen bg-[#0b0c13] flex">
      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 flex flex-col bg-[#0e0f18] border-r border-[#1e1f2e] min-h-screen">
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3 border-b border-[#1e1f2e]">
          <EthLogo size={30} glow />
          <div>
            <p className="text-sm font-bold text-[#dde1f5] leading-none">EthBase</p>
            <p className="text-[10px] text-[#4a4e6a] mt-0.5">Wallet Interface</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 p-3 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#2e3148] px-4 mb-2 mt-1">
            Menu
          </p>
          <NavItem
            active
            label="Dashboard"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            }
          />
          <NavItem
            label="Wallet"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3m18-3v3" />
              </svg>
            }
          />
          <NavItem
            label="Send ETH"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            }
          />
          <NavItem
            label="History"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#2e3148] px-4 mt-5 mb-2">
            Network
          </p>
          <NavItem
            label="Mainnet"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
              </svg>
            }
          />
          <NavItem
            label="Sepolia"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.319 2.798H4.117c-1.35 0-2.32-1.798-1.319-2.798L5 14.5" />
              </svg>
            }
          />
        </nav>

        {/* Wallet footer chip */}
        <div className="p-3 border-t border-[#1e1f2e]">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#0b0c13] border border-[#1e1f2e]">
            <div className="w-7 h-7 rounded-full bg-[#627EEA]/15 border border-[#627EEA]/25 flex items-center justify-center shrink-0">
              <EthLogo size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-[#8a90b0] truncate">
                {isConnected && address
                  ? `${address.slice(0, 6)}…${address.slice(-4)}`
                  : "Not connected"}
              </p>
              <p className="text-[10px] text-[#2e3148]">Ethereum</p>
            </div>
            <span className={`w-2 h-2 rounded-full shrink-0 ${isConnected ? "bg-[#00d395]" : "bg-[#2e3148]"}`} />
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#1e1f2e] bg-[#0b0c13]/90 backdrop-blur sticky top-0 z-10">
          <div>
            <h1 className="text-base font-bold text-[#dde1f5]">Dashboard</h1>
            <p className="text-xs text-[#4a4e6a]">Ethereum wallet overview</p>
          </div>
          {isConnected ? (
            <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#00d395]/10 border border-[#00d395]/25 text-[#00d395]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d395] animate-pulse" />
              Connected
            </span>
          ) : (
            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#1e1f2e] border border-[#2a2b3d] text-[#4a4e6a]">
              Not connected
            </span>
          )}
        </header>

        <div className="flex-1 p-8 flex flex-col gap-6">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Network" value="Ethereum" sub="EVM compatible" />
            <StatCard label="Supported Chains" value="2" sub="Mainnet · Sepolia" />
            <StatCard label="Transaction Type" value="EIP-1559" sub="Dynamic gas fee" />
          </div>

          {/* Main panels */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Wallet panel */}
            <div className="rounded-2xl bg-[#11121c] border border-[#1e1f2e] overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#627EEA]/40 to-transparent" />
              <div className="px-6 py-4 border-b border-[#1e1f2e] flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#627EEA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3m18-3v3" />
                </svg>
                <span className="text-sm font-semibold text-[#dde1f5]">Wallet</span>
              </div>
              <div className="p-6">
                <WalletAdapter />
              </div>
            </div>

            {/* Send panel */}
            <div className="rounded-2xl bg-[#11121c] border border-[#1e1f2e] overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#627EEA]/40 to-transparent" />
              <div className="px-6 py-4 border-b border-[#1e1f2e] flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#627EEA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <span className="text-sm font-semibold text-[#dde1f5]">Send ETH</span>
              </div>
              <div className="p-6">
                {isConnected ? (
                  <SendEth />
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#627EEA]/10 border border-[#627EEA]/20 flex items-center justify-center">
                      <EthLogo size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#8a90b0]">Wallet not connected</p>
                      <p className="text-xs text-[#4a4e6a] mt-1">Connect your wallet to send ETH</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ethereum info ribbon */}
          <div className="rounded-2xl bg-gradient-to-r from-[#627EEA]/[0.07] via-[#627EEA]/[0.03] to-transparent border border-[#627EEA]/15 px-7 py-5 flex items-center gap-5">
            <EthLogo size={38} glow />
            <div>
              <p className="text-sm font-semibold text-[#dde1f5]">
                Ethereum · Proof of Stake
              </p>
              <p className="text-xs text-[#4a4e6a] mt-0.5">
                Built with wagmi v3 · viem · React 19 · Tailwind CSS v4
              </p>
            </div>
            <div className="ml-auto hidden lg:flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-[#4a4e6a] uppercase tracking-widest">Consensus</p>
                <p className="text-xs font-semibold text-[#8fa5f5]">Proof of Stake</p>
              </div>
              <div className="w-px h-8 bg-[#1e1f2e]" />
              <div className="text-right">
                <p className="text-[10px] text-[#4a4e6a] uppercase tracking-widest">Block time</p>
                <p className="text-xs font-semibold text-[#8fa5f5]">~12 sec</p>
              </div>
              <div className="w-px h-8 bg-[#1e1f2e]" />
              <div className="text-right">
                <p className="text-[10px] text-[#4a4e6a] uppercase tracking-widest">Finality</p>
                <p className="text-xs font-semibold text-[#8fa5f5]">~13 min</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
