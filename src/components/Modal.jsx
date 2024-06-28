import React from 'react'
import { useEffect } from 'react'

const Modal = ({setModalOpen , state}) => {
    const {contract} = state
    const sharing=async()=>{
        const address = document.querySelector(".address").value
        await contract.allow(address)
        console.log("sharing with " , address)
    }

    useEffect(()=>{
        const accessList=async()=>{
            const addressList = await contract.shareAccess()
            let select = document.querySelector("#selectNumber")
            const options = addressList;
            for (let i = 0; i < options.length; i++) {
                let opt = options[i];
                let e1 = document.createElement("option")
                e1.textContent=opt;
                e1.value=opt;
                select.appendChild(e1);
            }
        }
        {contract && accessList()}
    },[])
  return (
    <div>
        <div>
            <div>
                <div>Share With</div>
                <div>
                <input type="text" className='address' placeholder='Enter Address' />
                </div>
                <form id='myForm'>
                    <select  id="selectNumber">
                        <option value="" className='address'>People with Address</option>
                    </select>
                </form>
                <div>
                    <button onClick={()=>{
                        setModalOpen(false)
                    }}>Cancel</button>
                    <button onClick={()=>sharing()}>Share</button>

                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Modal
