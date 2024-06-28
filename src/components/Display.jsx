import React from 'react'
import { useState } from 'react'

const Display = ({state, account}) => {
    const [data,setData] = useState("")
    const{contract} = state;
    const getData = async ()=>{
        let dataArray;
        const OtherAddress = document.querySelector(".address").value;
        try{
        if(OtherAddress){
            console.log(OtherAddress)
            dataArray= await contract.display(OtherAddress)
            console.log(dataArray)
        }else{
            console.log(account)
            dataArray = await contract.display(account)
            console.log(dataArray)
        }
    }catch(e){
        alert("You dont have access !!")
    }
        const isEmpty = Object.keys(dataArray).length === 0;
        if(!isEmpty){
            const str = dataArray.toString();
            const str_array = str.split(",")
            console.log(str)
            console.log(str_array)
            const images = str_array.map((item,i)=>{
                {
                    return(
                        <a href={item} key={i} target="_blank">
                            <img src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="new" key={i} />
    
                        </a>
                    )
                }
            })
            setData(images);
            
        }else{
            alert("No image to display.")
        }
    }

  return (
    <div>
        <div>{data}</div>
        <input type="text" placeholder= "Enter Address" className='address' />
        <button onClick={getData}>Get Data</button>
      
    </div>
  )
}

export default Display
