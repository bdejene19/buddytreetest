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
  async function getAPIData() {
    responseData = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    setData(responseData.map(data =>   <BasicCard key={data.id} name={data.name} username={data.username} city={data.address.city} zipcode={data.address.zipcode}></BasicCard>))

    return data;
  }

  let loaderRef = useRef(null);

  function loadMore(totalEntries, observer) {
    totalEntries.forEach((entry) => {
      if (entry.isIntersecting) {
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
  

  useEffect(() => {
    getAPIData()
    
  }, [])

  useEffect(() => {
    
    let parentAncestorScroll = document.querySelector('#masterParent');

    let observerOptions = {
      root: parentAncestorScroll,
      rootMargin: '50px',
      //threshold 1.0 = callback when 100% of observer is in view
      threshold: 0.9,
    }
  
    let observer = new IntersectionObserver(loadMore, observerOptions);
    
    observer.observe(document.querySelector('#addedContent'))
   

   
  }, [loaderRef, loadMore])
  

  // create intersection observer
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
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
