import React,{useState} from 'react'
// import '../styles/Contacts.css';
import { Footer } from './Footer';
import { Modal } from './Modal';
export const Contacts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <>
    <h1 className='text-black text-center text-3xl md:text-4xl lg:text-5xl mt-1 '>Contacts Us</h1>
    <div className='contactsContainer  grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
     
        {/* <Modal/> */}
        {/* <h2 className='text-5xl text-red-500 font-bold'>Contact Us</h2> */}
        <div className='addressContainer w-72 h-auto rounded-xl mt-5 mb-5 bg-slate-300 text-md p-3 shadow-2xl lg:text-lg lg:w-96 lg:leading-8 lg:h-80 lg:rounded-2xl'>
           
            {/* <h5>Ecommerce Online Order Support</h5>
            <p><b>Email:</b> sasengineering@gmail.com</p>
            <p><b>For Online Order Realated Queries:</b> 7666299405</p>
            <p><b>To get Quote click here: <span onClick={handleOpenModal} className='clickable'>Click Here</span></b></p> */}
            {/* <div className='dividerDiv'></div> */}
            <h4>Corporate Office - Kolkata</h4>
            <p><b>Address:</b> 5th Floor, PlotK, & GP ROB Boulevard, 1, Street Number 18, EP Block SectorV, Bidhannagar, Kolkata
            </p>
            {/* <p><b>Phone:</b> 7756869619</p> */}
            <p><b>Email:</b> meraj@SasAutomation.in</p>
            {/* <p><b>Gst No:</b> 27AATCS4445F1ZY</p> */}
        </div>

        <div className='addressContainer w-72 h-72 rounded-xl mt-5 mb-5 bg-slate-300  text-md p-3 shadow-2xl lg:text-lg lg:w-96 lg:leading-8 lg:h-80 lg:rounded-2xl'>
           
            {/* <h5>Ecommerce Online Order Support</h5>
            <p><b>Email:</b> sasengineering@gmail.com</p>
            <p><b>For Online Order Realated Queries:</b> 7666299405</p>
            <p><b>To get Quote click here: <span onClick={handleOpenModal} className='clickable'>Click Here</span></b></p> */}
            {/* <div className='dividerDiv'></div> */}
            <h4>Corporate Office - Pune</h4>
            <p><b>Address:</b> Shree Sant Dnyaneshwar Industrial Estate Plot 59,58, Unit no 08,
            Near Mohanagar Police Chowki, Mohan Nagar Main Rd, D-II Block, MIDC, Chinchwad Maharashtra 411019
            </p>
            <p><b>Phone:</b> 7756869619</p>
            <p><b>Email:</b> Contact@SasAutomation.in</p>
            <p><b>Gst No:</b> 27AATCS4445F1ZY</p>
        </div>

        <div className='addressContainer w-72 h-72 rounded-xl mt-5 mb-5 bg-slate-300 text-md p-3 shadow-2xl lg:text-lg lg:w-96 lg:leading-8 lg:h-80 lg:rounded-2xl'>
           
            {/* <h5>Ecommerce Online Order Support</h5>
            <p><b>Email:</b> sasengineering@gmail.com</p>
            <p><b>For Online Order Realated Queries:</b> 7666299405</p>
            <p><b>To get Quote click here: <span onClick={handleOpenModal} className='clickable'>Click Here</span></b></p> */}
            {/* <div className='dividerDiv'></div> */}
            <h4>Corporate Office - Chennai</h4>
            <p><b>Address:</b> At 5+B Smyma HIG Phase 1, Nolambur, Chennai - 600037
            </p>
            <p><b>Phone:</b> 9003292301</p>
            <p><b>Email:</b> meraj@SasAutomation.in</p>
            {/* <p><b>Gst No:</b> 27AATCS4445F1ZY</p> */}
        </div>

        
        
      {/* <Footer/> */}
      {isModalOpen && <Modal message="Please provide your details for a quote" onClose={handleCloseModal} />}
    </div>
    </>
  )
}