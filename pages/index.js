/** This code was written by Bemnet Dejene and deployed on Saturday, Feb 27th. 
 * Its purpose is to show BuddyTree hiring team coding abilities and feature implementation quality.
 * App uses intersection observer API to implement endless scroll affect.
 * React hooks were used to give class-like functionality to have state and handle any component updates and external API call.
 * Endless scroll call to API every time observer is in view.
 * Material-UI card component is used style data from API
 */

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BasicCard from '../components/BasicCard'
import {useEffect, useState, useRef  } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * assessment instructions:
 * 
 * "Please use Next.js
 * utilize API Routes and rewrites where applicable
 * use Material-UI. 
 * Create an endless feed application where you can click on an item and go to a 
 * generic info page within the application. (Please provide a link to your work within three days).
 */

export default function Home() {
  let responseData = [];
  const [data, setData] = useState(null);
  const [addedContent, setAddedContent] = useState(null);
  // function to call to API and handle data.
  async function getAPIData() {
    responseData = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    setData(responseData.map(data =>   <BasicCard key={data.id} name={data.name} username={data.username} city={data.address.city} zipcode={data.address.zipcode}></BasicCard>))

    return data;
  }

  let loaderRef = useRef(null);
  
  // callback function everytime target is in sight
  function loadMore(totalEntries, observer) {
    totalEntries.forEach((entry) => {
      // if target is intersecting with viewport
      if (entry.isIntersecting) {
        // amount of target intersecting with viewport and checking edge cases
        if (entry.intersectionRatio >= 0.6 && addedContent !== null) {
          document.getElementById('loadSpinner').style.display = 'inline-block';
          getAPIData();
          setAddedContent([...addedContent, data]);
          document.getElementById('loadSpinner').style.display = 'none';
        } 
        if (entry.intersectionRatio >= 0.6 && addedContent === null) {
          document.getElementById('loadSpinner').style.display = 'inline-block';
          getAPIData();
          setAddedContent(data);
          document.getElementById('loadSpinner').style.display = 'none';

        } 
      }      
    })
  }
  
  // initial loaded data
  useEffect(() => {
    getAPIData()
  }, [])

  // component update for when client has been scrolled to bottom via intersection observer API
  useEffect(() => {
    // parent scroll for reference point
    let parentAncestorScroll = document.querySelector('#masterParent');

    // what will be observed
    let observerOptions = {
      root: parentAncestorScroll,
      rootMargin: '50px',
      //threshold 1.0 = callback when 100% of observer is in view
      threshold: 0.9,
    }
    
    // initialize observer, for callback function every time target is found in our parent ancestor
    let observer = new IntersectionObserver(loadMore, observerOptions);
    
    // observe target
    observer.observe(document.querySelector('#addedContent'))
    
  }, [loaderRef, loadMore])
  

  
  return (
    <div className={styles.container}>
      <Head>
        <title>BuddyTree Inc. Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* my endless feed container */}
      <div className={styles.endlessContainer} id='masterParent'>

        <div className={styles.endlessDiv}>
          {data}      
        </div>

        <div>
          {addedContent}
        </div>

        <div id='addedContent' ref={loadingRef => loadingRef = loadingRef}>
        </div>
        
      </div>
      <LoadingSpinner className={styles.loadSpinner} id='loadSpinner'></LoadingSpinner>


    </div>
  )
}
