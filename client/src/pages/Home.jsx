// // import React, { useEffect, useState } from 'react';
// // import Hero from '../component/Hero'; // Adjust path if necessary
// // import Farmer from '../component/Farmer'; // Adjust path if necessary
// // import Contractor from '../component/Contractor'; // Adjust path if necessary
// // import axios from 'axios'; // Import axios for making API requests
// // import Testimonials from '../component/Testimonials'; // Adjust path if necessary
// // import Footer from '../component/Footer';

// // const Home = () => {
// //   const [userRole, setUserRole] = useState(null);
// //   const [loading, setLoading] = useState(true); // Add loading state

// //   useEffect(() => {
// //     const checkUserRole = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (token) {
// //           // Make an API request to verify the token and get the user role
// //           const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });

// //           const role = response.data.role; // Assume role is in the response
// //           localStorage.setItem('role', role); // Ensure role is stored in localStorage
// //           setUserRole(role);
// //         }
// //       } catch (error) {
// //         console.error('Error verifying token:', error);
// //         // Optionally, clear token and role from localStorage if there's an error
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('role');
// //       } finally {
// //         setLoading(false); // Set loading to false after the check is complete
// //       }
// //     };

// //     checkUserRole();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>; // Show loading indicator while checking the role
// //   }

// //   if (userRole === 'farmer') {
// //     return <Farmer />;
// //   } else if (userRole === 'contractor') {
// //     return <Contractor />;
// //   } else {
// //     return (
// //       <div>
// //         <Hero />
// //         <div className="mt-10"> {/* Add margin or any other styling if needed */}
// //           <Testimonials />
// //           <Footer/>
// //         </div>
// //       </div>
// //     );
// //   }
// // };

// // export default Home;






// import React, { useEffect, useState } from 'react';
// import Hero from '../component/Hero'; 
// import Farmer from '../component/Farmer'; 
// import Contractor from '../component/Contractor'; 
// import axios from 'axios'; 
// import Testimonials from '../component/Testimonials'; 
// import Footer from '../component/Footer';
// import Navbar from '../component/Navbar'; // Make sure you have Navbar

// const Home = () => {
//   const [userRole, setUserRole] = useState("farmer"); // Default role after login
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           // Verify token (optional: you may skip role check since default is farmer)
//           await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//         }
//       } catch (error) {
//         console.error('Error verifying token:', error);
//         localStorage.removeItem('token');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//      {/* Navbar is  included in App.js */}
//       {/* <Navbar onSwitchRole={() => setUserRole(userRole === "farmer" ? "contractor" : "farmer")} /> */}

//       {userRole === "farmer" ? (
//         <Farmer />
//       ) : (
//         <Contractor />
//       )}

//       {/* If you still want common landing page when not logged in, you can keep this */}
//       {!localStorage.getItem("token") && (
//         <div>
//           <Hero />
//           <div className="mt-10">
//             <Testimonials />
//             <Footer />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import Hero from '../component/Hero'; 
import Farmer from '../component/Farmer'; 
import Contractor from '../component/Contractor'; 
import axios from 'axios'; 
import Testimonials from '../component/Testimonials'; 
import Footer from '../component/Footer';

const Home = ({ userRole }) => { // Receive userRole from App.jsx
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Show Farmer or Contractor UI based on role from App.jsx */}
      {userRole === "farmer" ? <Farmer /> : <Contractor />}

      {/* Show common landing page if not logged in */}
      {!localStorage.getItem("token") && (
        <div>
          <Hero />
          <div className="mt-10">
            <Testimonials />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
