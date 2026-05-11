import {useAccount , useConnect , useDisconnect} from "wagmi";

export function WalletAdaptor(){
    const {address , isConnected , chain } = useAccount();
    const {connectors , connect , status , error } = useConnect();
    const {disconnect} = useDisconnect();

    if(isConnected){
        return 
        <div>
            <p><strong>Connected:</strong>{address?.slice(0,6)}......{address?.slice(-4)}</p>
            <p><strong>Network:</strong>{chain?.name}</p>
            <button onClick={()=>disconnect()}>Disconnect</button>
        </div>
    }

    return <div>
        <h3>Connect your Wallet</h3>
        <div>
            {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={status === 'pending'}
          >
            {connector.name}
          </button>
        ))}
        </div>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
}