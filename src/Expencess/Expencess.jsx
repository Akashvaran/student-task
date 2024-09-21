import { useState } from 'react'
import './expences.css'

let Data = [
    {
        name: 'Raj',
        image: 'https://th.bing.com/th/id/OIP.M9AsZ7Sm6Qq-LXpY92Tt2AHaEK?rs=1&pid=ImgDetMain',
        desc: 'You and Clark Add'
    },
    {
        name: 'Karthick',
        image: 'https://th.bing.com/th/id/OIP.M9AsZ7Sm6Qq-LXpY92Tt2AHaEK?rs=1&pid=ImgDetMain',
        desc: 'You and Clark Add'
    },
]

const SpliteExpencess = (e) => {
    let newvalue = document.getElementById('frd-expences')
    let splitExpences = document.getElementById('total-bill')
    newvalue.value = parseInt(splitExpences.value) - parseInt(e.target.value)
}

const BillValueChange = (e) => {
    let newvalue = document.getElementById('frd-expences')
    newvalue.value = e.target.value
}

export const Expencess = () => {

    const [ExistUserDetails, setExistUserDetails] = useState([...Data])
    const [FormClose, setFormClose] = useState('close')
    const [cardid, setCardid] = useState(0)
    const [showSplitBox, setShowSplitBox] = useState(false);
    const [showBillValue, setShowBillValue] = useState(false);
    const [billValue, setBillValue] = useState(0);

    const ShowForm = () => FormClose === 'close' ? setFormClose('show') : setFormClose('close')

    function ShowSplitBox(e, i) {
        const btn = e.target
        setCardid(i)
        setShowSplitBox(true) // Always show the split box
        btn.innerText = 'Close'
    }

    function ExpenceFormSubmit(e) {
        e.preventDefault()
        let updatedData = [...ExistUserDetails];
        const expense = e.target.frdexpence.value;
        if (e.target.Payperson.value === 'You') {
            updatedData[cardid].desc = `${updatedData[cardid].name} owes you ${expense}$`
        } else {
            updatedData[cardid].desc = `You owe ${updatedData[cardid].name} ${expense}$`
        }
        setExistUserDetails(updatedData)

        // Show the bill value
        setBillValue(e.target.totalBill.value);
        setShowBillValue(true);
    }

    function SpiltBill() {
        return (
            <div className={`splitbill-box ${showSplitBox ? 'splitbill-box-show' : ''}`} id='splitbox'>
                <h2>SPLIT A BILL WITH {ExistUserDetails[cardid].name.toUpperCase()}</h2>
                <form className="splitbill-form" onSubmit={ExpenceFormSubmit}>
                    <table>
                        <tbody >
                            <tr>
                                <td><label htmlFor="total-bill">Bill value</label></td>
                                <td><input type="number" id='total-bill' name='totalBill' onChange={BillValueChange} required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Your expense</label></td>
                                <td><input type="number" id='your-expences' onChange={SpliteExpencess} required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">{ExistUserDetails[cardid].name} expense</label></td>
                                <td><input type="number" id='frd-expences' name='frdexpence' value={0} disabled style={{ textAlign: 'center' }} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Who is Paying the bill</label></td>
                                <td>
                                    <select name="Payperson" id="select">
                                        <option value="You">You</option>
                                        <option value={ExistUserDetails[cardid].name}>{ExistUserDetails[cardid].name}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className='existuser-btn split-submit'>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }

    const addFormSubmit = (e) => {
        e.preventDefault()
        const frdname = e.target.frdname.value
        const frdimg = e.target.frdimage.value
        let newFrd = {
            name: frdname,
            image: frdimg,
            desc: `You and ${frdname} are sharing equally`
        }
        let updatedData = [...ExistUserDetails, newFrd];
        setExistUserDetails(updatedData)
        setFormClose('close')
        alert('Added Successfully')
    }

    function AddFrd() {
        return (
            <>
                <div className={FormClose} id='addFormBox'>
                    <form className="addfrd-form" onSubmit={addFormSubmit}>
                        <table>
                            <tbody >
                                <tr>
                                    <td><label htmlFor="">Friend Name</label></td>
                                    <td><input name='frdname' type="text" required /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="">Image Url</label></td>
                                    <td><input name='frdimage' type="text" required /></td>
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

    function ExistUser() {
        return (
            <>
                <div className='existUser-box'>
                    {
                        ExistUserDetails.map((e, i) => {
                            return (
                                <div className="existuser-card" key={i}>
                                    <img src={e.image} alt="" />
                                    <div className="userdetail-box">
                                        <h4 className="uname">{e.name}</h4>
                                        <p className="udesc">{e.desc}</p>
                                    </div>
                                    <button className='existuser-btn' key={i} onClick={(e) => ShowSplitBox(e, i)}>Select</button>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    function BillValueDisplay() {
        return (
            <div className="billvalue-display">
                <div className='child-container'>
                    <h2>Bill Value</h2>
                    <p>The total bill is: ${billValue}</p>
                    
                    <p>your bill : 2000</p>
                    <p> raj bill ammount: 1500</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="expences-container">
                <div className="left-main">
                    <ExistUser />
                    <div className="addbtn">
                        <button className='existuser-btn' onClick={ShowForm}>{FormClose === 'close' ? 'Add Friend' : 'Close'}</button>
                    </div>
                    <AddFrd />
                </div>
                <div className="right-main">
                    <SpiltBill />
                    {showBillValue && <BillValueDisplay />}
                </div>
            </div>
        </>
    )
}

