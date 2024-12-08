// // src/pages/PageFour/PageFour.tsx

// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import {
//   fetchAvgPercentageFull12MonthsThunk,
//   fetchAvgPercentageFull5YearsThunk,
//   fetchAvgPercentageFull20YearsThunk,
// } from '../../features/damResources/damResourcesSlice';
// import './PageFour.scss';

// const PageFour: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const { avg12Months, avg5Years, avg20Years, status, error } = useAppSelector(
//     (state) => state.damResources
//   );

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchAvgPercentageFull12MonthsThunk());
//       dispatch(fetchAvgPercentageFull5YearsThunk());
//       dispatch(fetchAvgPercentageFull20YearsThunk());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div className="page-four">Loading average data...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="page-four error">{error}</div>;
//   }

//   return (
//     <div className="page-four">
//       <h1>Dam Averages</h1>
//       <div className="averages-container">
//         <div className="average-card">
//           <h2>12 Months Average</h2>
//           <p>{avg12Months !== null ? `${avg12Months.toFixed(2)}%` : 'N/A'}</p>
//         </div>
//         <div className="average-card">
//           <h2>5 Years Average</h2>
//           <p>{avg5Years !== null ? `${avg5Years.toFixed(2)}%` : 'N/A'}</p>
//         </div>
//         <div className="average-card">
//           <h2>20 Years Average</h2>
//           <p>{avg20Years !== null ? `${avg20Years.toFixed(2)}%` : 'N/A'}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageFour;
