import { useAccount } from "wagmi";
import { WalletAdaptor } from "./WalletAdapter";
import { SendEth } from "./SendEth";

function App(){
  const {isConnected} = useAccount();

  return <div>
    <h1>Wallet Adapter</h1>
    <WalletAdaptor/>
    <hr/>
    {isConnected ? (<SendEth/>) : (<p>Please Connect your wallet before</p>)}
  </div>

}

export default App;