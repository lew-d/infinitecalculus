import Head from 'next/head'
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import animate from '../lib/animate'

import 'katex/dist/katex.min.css';

import Differentiation from '../components/differentiation'
import Trigonometry from '../components/trigonometry'

function Intro({ onEnter, text }) {
  //framer motion fade out

  return (
    <motion.div {...animate}
      className='relative text-5xl py-5 hover:cursor-pointer text-blue-500 hover:text-blue-400 transition-colors' onTap={onEnter}>
      {text}
    </motion.div>
  )
}

export default function Home() {
  var [entered, setEntered] = useState(false)
  var [diffAppeared, setDiffAppeared] = useState(false)
  var [trigAppeared, setTrigAppeared] = useState(false)

  var enterDiff = () => {
    setEntered(true)
    setTimeout(() => {
      setDiffAppeared(true)
    }, 210)
  }

  var enterTrig = () => {
    setEntered(true)
    setTimeout(() => {
      setTrigAppeared(true)
    }, 210)
  }



  var onTrigEnd = () => {
    setTrigAppeared(false)
    setTimeout(() => {
      setTrigAppeared(true)

      setEntered(true)
    }, 300)
  }

  var onDiffEnd = () => {
    //alert("ended")
    setDiffAppeared(false)
    setTimeout(() => {
      setDiffAppeared(true)

      setEntered(true)
    }, 300)
  }


  return (
    <div>
      <Head>
        <title>Infinite Calculus</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="flex h-screen">
          <div className="m-auto">
            <AnimatePresence>
              {!entered && <div>
                <Intro key="intro" onEnter={enterDiff} text={"Differentiation -->"} />
              </div>}
              {diffAppeared &&
                <Differentiation
                  key="question"
                  onEnd={onDiffEnd} />
              }
              {trigAppeared &&
                <Trigonometry
                  key="question"
                  onEnd={onTrigEnd} />
              }
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        I Ran Out Of Differentiation Questions 😔
      </footer>
    </div >
  )
}
