import Head from 'next/head'
import { Landing, Navbar} from '../components'
import styles from '../styles/Home.module.scss'

import { useEffect, useRef, useState } from 'react'



export default function Home() {

  const [navActive, setNavStatus] = useState("true");
  const [userName, setName] = useState("");

  useEffect(() => {

  }, [navActive])



  return (
    <div>
      <Head>
         <title>Hikeable</title>
         {/* <meta name="description" content="hiking japan" /> */}
         <link rel="icon" href="/boots.png" /> 
         {/* <link rel="icon" href="/favicon.ico" />  */}
      </Head>
      <Landing/>
      {
        // Boolean(navActive) === true? (
        //     <Navbar navActive={true} isLoggedIn={false} userName={userName} logOff={()=>{}}/>
        // ): <Navbar navActive={false} isLoggedIn={false} userName={''} logOff={()=>{}}/>
      }



    </div>

  )
}

