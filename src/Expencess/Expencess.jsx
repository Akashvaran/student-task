
import { useState } from 'react'
import './expences.css'


let Data=[
    {
        name:'Raj',
        image:'https://th.bing.com/th/id/OIP.M9AsZ7Sm6Qq-LXpY92Tt2AHaEK?rs=1&pid=ImgDetMain',
        desc:'You and Clark Add'
    },
    {
        name:'Karthick',
        image:'https://th.bing.com/th/id/OIP.M9AsZ7Sm6Qq-LXpY92Tt2AHaEK?rs=1&pid=ImgDetMain',
        desc:'You and Clark Add'
    },
]









const SpliteExpencess=(e)=>{
    let newvalue = document.getElementById('frd-expences')
    let splitExpences = document.getElementById('total-bill')
    newvalue.value=parseInt(splitExpences.value)-parseInt(e.target.value)
}
const BillValueChange=(e)=>{  
    let newvalue = document.getElementById('frd-expences')  
    newvalue.value=e.target.value
}





export const Expencess = () => {

    const [ExistUserDetails,setExistUserDetails] = useState(Data)
    const [FormClose,setFormClose]=useState('close')
    const [OweAmount,setOweAmount] = useState('')
    const [cardid,setCardid] = useState(0)
    const ShowForm = ()=>FormClose == 'close' ? setFormClose('show') : setFormClose('close')
    



function ShowSplitBox(e,i){
    const btn = e.target
    console.log(e.target.getAttribute('key'))
    setCardid(i)
    let splitbox=document.getElementById('splitbox')
    splitbox.classList.toggle('splitbill-box-show')
    if(btn.innerText == 'Select')
    {
        btn.innerText='Close'
    }
    else{
        btn.innerText='Select'
    }
}

function ExpenceFormSubmit(e){
    e.preventDefault()
    if(e.target.Payperson.value == 'You')
    {
        Data[cardid].desc=`${Data[cardid].name} owes you ${e.target.frdexpence.value}$`
        setExistUserDetails(Data)
    }
    else{
        Data[cardid].desc=`You ows ${Data[cardid].name} ${e.target.frdexpence.value}$`
        setExistUserDetails(Data)
    }

}

function SpiltBill(){
    return(
        <div className="splitbill-box" id='splitbox'>
            <h2>SPLIT A BILL WITH CLARK</h2>
             <form action="" className="splitbill-form" onSubmit={ExpenceFormSubmit}>
                    <table>
                        <tbody >
                            <tr>
                                <td><label htmlFor="total-bill">Bill value</label></td>
                                <td><input type="number" id='total-bill' onChange={BillValueChange} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Your expense</label></td>
                                <td><input type="number" id='your-expences' onChange={SpliteExpencess} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">{Data[cardid].name} expense</label></td>
                                <td><input type="number" id='frd-expences' name='frdexpence' value={0}  disabled style={{textAlign:'center'}}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Who is Paying the bill</label></td>
                                <td>
                                    <select name="Payperson" id="select">
                                        <option value="You">You</option>
                                        <option value={Data[cardid].name}>{Data[cardid].name}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button  className='existuser-btn split-submit'>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </form>
        </div>
    )
}

    const addFormSubmit = (e)=>{
        e.preventDefault()
        const frdname = e.target.frdname
        const frdimg = e.target.frdimage
        let newFrd={
            name:frdname.value,
            image:frdimg.value,
            desc:`You and ${frdname.value} are share equaly`
        }
        Data.push(newFrd)
        setExistUserDetails(Data)
        setFormClose('close')
        alert('Added Successfully')

    }

    function AddFrd(){
    return(
        <>
            <div className={FormClose} id='addFormBox'>
                <form action="" className="addfrd-form" onSubmit={addFormSubmit}>
                    <table>
                        <tbody >
                            <tr>
                                <td><label htmlFor="">Friend Name</label></td>
                                <td><input name='frdname' type="text" /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Image Url</label></td>
                                <td><input name='frdimage' type="text" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className='existuser-btn split-submit'>Add</button></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </form>                
            </div>
        </>
    )
}

    function ExistUser(){    
    
    return(
        <>
            <div className='existUser-box'>
                {
                    ExistUserDetails.map((e,i)=>{
                        return(
                            <div className="existuser-card" key={i}>
                                <img src={e.image} alt="" />
                                <div className="userdetail-box">
                                    <h4 className="uname">{e.name}</h4>
                                    <p className="udesc">{e.desc}</p>
                                </div>
                                <button className='existuser-btn' key={i}  onClick={(e)=>ShowSplitBox(e,i)}>Select</button>
                            </div>
                        )
                    })
                }  
                              
            </div>
        </>
    )
}
    
    
  return (
    <>
        <div className="expences-container">
            <div className="left-main">
                <ExistUser/>
                <div className="addbtn">
                    <button className='existuser-btn' onClick={(ShowForm)}>{FormClose == 'close'?'Add Friend':'Close'}</button>
                </div>
                <AddFrd />
                
            </div>
            <div className="right-main">
                <SpiltBill/>
            </div>
        </div>
    </>
  )
}
