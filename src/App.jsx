import FileUpload from './components/FileUpload'
import Display from './components/Display'
import { useState,useEffect} from 'react' 
import {ethers} from "ethers"
import abi from "./contract/Upload.json"
import Modal from './components/Modal'

import './App.css'

function App() {
  const[modalOpen, setModalOpen] = useState(false)
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    address: null
  });
  const [account , setAccount] = useState("")

  useEffect(() => {
    const connectWallet = async () => {
      window.ethereum.on("chainChanged", ()=>{
        window.location.reload()
      })
      window.ethereum.on("accountsChanged", ()=>{
        window.location.reload()
      })
      const contractAddress = "0xd72A3749e12e552eEEDee81Fd36Dccb99033C557";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log("Metamask is not installed");
          return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length === 0) {
          console.log("No account found");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress()
        setAccount(address)
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(signer)

        setState({ provider, signer, contract,address });
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    };

    connectWallet();
  }, []);
  

  console.log(state);
  console.log(account)

  

  return (
    <>
    {!modalOpen&&(<button onClick={()=>setModalOpen(true)}>Share</button>)}
   {modalOpen && <Modal setModalOpen={setModalOpen} state={state}/>}
    <h1>Gdrive 3.0</h1>
    <div></div>
    <div></div>
    <div></div>
    <p style={{color:"white"}}>Account : {account ? account:"Not connected"}</p>
    <FileUpload state={state} account={account}/>
    <Display state={state} account={account}/>

    
    
      
    </>
  )
}

export default App
