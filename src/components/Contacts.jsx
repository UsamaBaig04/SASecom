import React from 'react';
// import '../styles/index.scss';
export const Contacts = () => {
    return (
        <div className="bg-gray-100 p-8">
            <h1 className="text-black text-center text-3xl md:text-4xl lg:text-5xl mt-1 mb-8">Contact Us</h1>
            
            <div className="bg-white shadow-md rounded-lg p-6 gap-10 max-w-5xl mx-auto grid grid-cols-2 ">
                
                {/* Head Office */}
                <div className="bg-red-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Head Office:</h3>
                    <p>58, Unit, Police Chowki,</p>
                    <p>Shree Sant Dnyaneshwar Industrial Estate</p>
                    <p>Plot 59, no 08, Mohan Nagar Main Rd,</p>
                    <p>Near Mohanagar, D-II Block, MIDC,</p>
                    <p>Pimpri-Chinchwad, Maharashtra 41101</p>
                </div>

               

                {/* Mumbai Branch */}
                <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Mumbai Branch:</h3>
                    <p>Rupa Renaissance D-33,</p>
                    <p>Turbhe Midc Rd,</p>
                    <p>TTC Industrial Area,</p>
                    <p>Mumbai, Maharashtra 400705</p>
                </div>

                {/* Kolkata Branch */}
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Kolkata Branch:</h3>
                    <p>5th Floor Plot K, & GP, RDB Boulevard,</p>
                    <p>1, Street Number 18, EP Block, Sector V,</p>
                    <p>Bidhannagar, Kolkata,</p>
                    <p>West Bengal 700091</p>
                </div>

                {/* Chennai Branch */}
                <div className="bg-purple-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Chennai Branch:</h3>
                    <p>TNHB Phase I, Nolambur,</p>
                    <p>Ambattur Industrial Estate,</p>
                    <p>Chennai, Tamil Nadu 600095</p>
                </div>

                   {/* Saudi Arabia Branch */}
                <div className="bg-teal-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Saudi Arabia Branch:</h3>
                    <p>Building No. 3808, Street Twenty Five, </p>
                    <p>Ath Thuqbah Dist 34625,</p>
                    <p>Al Khobar, 34625, Saudi Arabia.</p>
                </div>

                {/* Contact Info */}
                <div className="bg-indigo-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Contact:</h3>
                    <p>Mob: +91-900-329-2301 / +91-895-648-6237</p>
                    <p>+91-985-041-8036</p>
                    <p>WhatsApp: +91-900-329-2301</p>
                    <p>Email: marketing@sasnextgen.co.in</p>
                    <p>sales01.kolkata@sasnextgen.co.in</p>
                    <p>meraj@sasautomation.in</p>
                    <p>Website: <a href="https://www.sasautomation.in" className="text-blue-600 hover:underline">www.sasautomation.in</a></p>
                </div>

                {/* R & D Center */}
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">R & D Center:</h3>
                    <p>Nashik, Maharashtra, India</p>
                </div>
                {/* Manufacturing/Warehouse */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Manufacturing/Warehouse:</h3>
                    <p>Koregaon Bhima, Pune, India</p>
                </div>

            </div>
          
        </div>
    );
};
