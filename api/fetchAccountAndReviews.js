// const fetchAccountAndReviews = async (accessToken) => {
//     try {
//       // Step 1: Fetching accountId
//       const accountResponse = await fetch(
//         `https://mybusinessaccountmanagement.googleapis.com/v1/accounts`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       if (accountResponse.status !== 200) {
//         console.error('Failed to fetch account');
//         return null;
//       }
  
//       const accountData = await accountResponse.json();
//       if (!accountData.accounts || accountData.accounts.length === 0) {
//         console.error('No accounts found in the response');
//         return null;
//       }
//       const accountId = accountData.accounts[0].name.split('/').pop();
//       console.log(accountId)
  
//       // Step 2: Fetching locations
//       const locationsResponse = await fetch(
//         `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?readMask=name`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       if (locationsResponse.status !== 200) {
//         console.error('Failed to fetch locations');
//         return null;
//       }
  
//       const locationsData = await locationsResponse.json();
//       if (!locationsData.locations || locationsData.locations.length === 0) {
//         console.error('No locations found for this account ID');
//         return null;
//       }
  
//       const locationIds = locationsData.locations.map((location) => {
//         const parts = location.name.split('/');
//         return parts[parts.length - 1];
//       });
  
//       // Step 3: Fetching reviews
//       const reviewsResponse = await fetch(
//         `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${"998452248873973625"}/reviews`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
  
//       if (reviewsResponse.status !== 200) {
//         console.error('API request failed with status:', reviewsResponse.status);
//         return null;
//       }
  
//       const reviewsData = await reviewsResponse.json();
//       const reviews = reviewsData;
  
//       return reviews;
//     } catch (error) {
//       console.error('API request error:', error);
//       return null;
//     }
//   };
  
//   export default fetchAccountAndReviews;









const fetchAccountAndReviews = async (accessToken) => {
    try {
      // Step 1: Fetching accountId
      const accountResponse = await fetch(
        `https://mybusinessaccountmanagement.googleapis.com/v1/accounts`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (accountResponse.status !== 200) {
        console.error('Failed to fetch account');
        return null;
      }
  
      const accountData = await accountResponse.json();
      if (!accountData.accounts || accountData.accounts.length === 0) {
        console.error('No accounts found in the response');
        return null;
      }
      const accountId = accountData.accounts[0].name.split('/').pop();
      console.log(accountId);
  
      // Step 2: Fetching locations
      const locationsResponse = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?readMask=name`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (locationsResponse.status !== 200) {
        console.error('Failed to fetch locations');
        return null;
      }
  
      const locationsData = await locationsResponse.json();
      if (!locationsData.locations || locationsData.locations.length === 0) {
        console.error('No locations found for this account ID');
        return null;
      }
  
      const locationIds = locationsData.locations.map((location) => {
        const parts = location.name.split('/');
        return parts[parts.length - 1];
      });
  
      // Step 3: Fetching reviews for each location
      const reviews = [];
      for (const locationId of locationIds) {
        const reviewsResponse = await fetch(
          `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        if (reviewsResponse.status === 200) {
          const reviewsData = await reviewsResponse.json();
          console.log("iterated revieew",reviewsData)
          if (reviewsData && reviewsData.reviews) {
            reviews.push(...reviewsData.reviews);
          }
        } else {
          console.error('API request failed with status:', reviewsResponse.status);
        }
      }
  
      console.log("final array",reviews)
      return reviews;
    } catch (error) {
      console.error('API request error:', error);
      return null;
    }
  };
  
  export default fetchAccountAndReviews;
  







// const fetchAccountAndReviews = async (accessToken) => {
//     try {
//       // Step 1: Fetching accountId
//       const accountResponse = await fetch(
//         `https://mybusinessaccountmanagement.googleapis.com/v1/accounts`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       if (accountResponse.status !== 200) {
//         console.error('Failed to fetch account');
//         return null;
//       }
  
//       const accountData = await accountResponse.json();
//       if (!accountData.accounts || accountData.accounts.length === 0) {
//         console.error('No accounts found in the response');
//         return null;
//       }
//       const accountId = accountData.accounts[0].name.split('/').pop();
//       console.log(accountId);
  
//       // Step 2: Fetching locations
//       const locationsResponse = await fetch(
//         `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?readMask=name`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       if (locationsResponse.status !== 200) {
//         console.error('Failed to fetch locations');
//         return null;
//       }
  
//       const locationsData = await locationsResponse.json();
//       if (!locationsData.locations || locationsData.locations.length === 0) {
//         console.error('No locations found for this account ID');
//         return null;
//       }
  
//       const locationIds = locationsData.locations.map((location) => {
//         const parts = location.name.split('/');
//         return parts[parts.length - 1];
//       });
  
//       // Step 3: Fetching reviews for multiple locations using batchGetReviews
//       const requestBody = {
//         locationNames: locationIds, // An array of location names
//         pageSize: 10, // Specify the page size as needed
//       };
  
//       const reviewsResponse = await fetch(
//         `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations:batchGetReviews`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );
  
//       if (reviewsResponse.status !== 200) {
//         console.error('API request failed with status:', reviewsResponse.status);
//         return null;
//       }
//       console.log(reviewsResponse.json())
  
//       const reviewsData = await reviewsResponse.json();
//       const reviews = reviewsData.reviews;
  
//       return reviews;
//     } catch (error) {
//       console.error('API request error:', error);
//       return null;
//     }
//   };
  
//   export default fetchAccountAndReviews;
  
  