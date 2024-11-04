import React from "react";
import "./verify.css"; // Import CSS for styling
import { useParams } from "react-router-dom"; // Import useParams for route parameters
import { VERIFY_ROUTE } from "@/utils/constants"; // Import verify route constant
import axios from "axios";
import { toast } from "sonner"; // Import toast notifications

const Verify = () => {
  const [verified, setVerified] = React.useState(false);
  const { userId, uniqueString } = useParams();

  React.useEffect(() => {
    // Create a promise for the verification request
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(`${VERIFY_ROUTE}/${userId}/${uniqueString}`)
          .then(response => resolve(response))
          .catch(err => reject(err));
      }, 2000); // Simulate a delay of 2 seconds
    });

    // Show toast notification based on promise result
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: () => {
        setVerified(true);
        return 'Verification successful';
      },
      error: (err) => err.response?.data?.message || 'An error occurred',
    });
  },[]); 

  return (
    <div className="container">
      <h1>
        {verified ? "Verification Completed successfully" : "Email verification in Process"}
      </h1>
    </div>
  );
};

export default Verify;
