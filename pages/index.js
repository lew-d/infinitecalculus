import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, onTap } from "framer-motion"
import { derivative, simplify } from 'mathjs'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css';

function ex(chance, base, f) {
  // 1 in chance chance of f being called
  if (Math.random() < chance) {
    return f(base)
  }
  return base
}

function GenerateEquation() {
  var base = "x"

  base = ex(0.4, base, (e) => e = e.replace("x", "log(x)"))

  base = ex(0.4, base, (e) => e = e.replace("x", "(x-1)"))

  //random int between 2 and 6
  var num = Math.floor(Math.random() * 6) + 2
  base = ex(0.8, base, (e) => e += "^" + num)

  base = ex(0.7, base, (e) => e = e.replace("log(x)", "sin(x)"))
  base = ex(0.7, base, (e) => e = e.replace("sin(x)", "cos(x)"))

  base = ex(0.2, base, (e) => e = e.replace("cos(x)", "tan(x)"))

  num = Math.floor(Math.random() * 6) + 2
  base = ex(0.8, base, (e) => e += "e^(" + num + "x)")

  console.log(base)
  if (base.length < 10) {
    base = "1/(" + base + ")"
  }
  return base
}

function Question({ onEnd, equation, answer }) {
  var [hideAnswer, setHideAnswer] = useState(true)
  var [answerAppeared, setAnswerAppeared] = useState(false)

  var findAnswer = () => {
    setHideAnswer(false)
    setTimeout(() => {
      setAnswerAppeared(true)
    }, 210)
  }

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }} className='text-5xl hover:cursor-pointer'>
      <AnimatePresence>
        {hideAnswer &&
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onTap={findAnswer}
            key="question"
          >
            <div className="opacity-20 pb-5 text-3xl">
              Question: (click for next)
            </div>
            <InlineMath math={equation} />

          </motion.div>
        }

        {
          answerAppeared &&
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }} onTap={() => onEnd()}
            key="Answer"
          >
            <div className="opacity-20 pb-5 text-3xl">
              Answer: (click for next)
            </div>
            <InlineMath math={answer} />
          </motion.div>
        }
      </AnimatePresence >
    </motion.div >
  )
}

function Intro({ onEnter }) {
  //framer motion fade out

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className='relative text-5xl hover:cursor-pointer text-blue-500' onTap={onEnter}>
      Start Differentiating -->
    </motion.div>
  )
}

function eqSplit(eq) {
  eq = simplify(eq)
  var equation = eq.toTex().replace("log", "ln")
  var answer = derivative(eq, 'x').toTex().replace("log", "ln")

  return { equation, answer }
}

export default function Home() {
  var [entered, setEntered] = useState(false)
  var [questionAppeared, setQuestionAppeared] = useState(false)

  var eq = GenerateEquation()
  var [equation, setEquation] = useState(eqSplit(GenerateEquation()))

  var enter = () => {
    setEntered(true)
    setTimeout(() => {
      setQuestionAppeared(true)
    }, 210)
  }

  var onEnd = () => {

    setQuestionAppeared(false)
    setTimeout(() => {
      var split = eqSplit(GenerateEquation())
      setEquation(split)
      setQuestionAppeared(true)
      setEntered(true)
    }, 210)
  }

  return (
    <div>
      <Head>
        <title>Infinite Calculus</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="flex h-screen">
          <div className="m-auto">
            <AnimatePresence>
              {!entered && <Intro key="intro" onEnter={enter} />}
              {questionAppeared && <Question key="question" onEnd={onEnd} equation={equation.equation} answer={equation.answer} />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Made By Lewis Because He Ran Out Of Maths Questions
      </footer>
    </div >
  )
}
