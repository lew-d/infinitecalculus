import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, onTap } from "framer-motion"
import { derivative, parse, simplify } from 'mathjs'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css';

function countInstances(string, word) {
  return string.split(word).length - 1;
}

function replaceAllInstances(original, word, f) {
  while (countInstances(original, word) > 0) {
    original = original.replace(word, f())
  }
  return original
}

function randomA() {
  var bases = [
    "x", "2x", "x^2", "(1/2)x"
  ]

  return `(${bases[Math.floor(Math.random() * bases.length)]})`
}

function randomB() {
  var bases = [
    "x-1", "x+1", "x^2", "x^2+x", "log(A)", "sin(A)", "cos(A)", "e^x", "e^2x", "(1/2)x"
  ]

  return `(${bases[Math.floor(Math.random() * bases.length)]})`
}

function generateDifferential() {
  /*
    where a is simple (2 terms, no e lor log)
    b is complex (2 terms, may have e or log)
  */
  var bases = [
    "A/B", "B+log(A)", "A/sin(A)", "A*cos(A)", "tan(A)/A", "B/cot(A)", "B*e^A", "e^B+B"
  ]

  // random base
  var base = bases[Math.floor(Math.random() * bases.length)]

  base = replaceAllInstances(base, "A", randomA)
  base = replaceAllInstances(base, "B", randomB)

  base = replaceAllInstances(base, "A", randomA)
  base = replaceAllInstances(base, "B", randomB)

  return base
}

const animate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 }
}

function DifferentiationQuestion({ onEnd, equation, answer }) {
  var [hideAnswer, setHideAnswer] = useState(true)
  var [answerAppeared, setAnswerAppeared] = useState(false)

  var findAnswer = () => {
    setHideAnswer(false)
    setTimeout(() => {
      setAnswerAppeared(true)
    }, 210)
  }

  return (
    <motion.div {...animate} className='text-5xl hover:cursor-pointer'>
      <AnimatePresence>
        {hideAnswer &&
          <motion.div {...animate}
            onTap={findAnswer}
            key="question"
          >
            <div className="opacity-20 pb-5 text-3xl">
              Question: (click for next)
            </div>
            <InlineMath math={"y=" + equation} />

          </motion.div>
        }

        {
          answerAppeared &&
          <motion.div  {...animate}
            onTap={() => onEnd()}
            key="Answer"
          >
            <div className="opacity-20 pb-5 text-3xl">
              Answer: (click for next)
            </div>
            <InlineMath math={"\\frac{dy}{dx}=" + answer} />
          </motion.div>
        }
      </AnimatePresence >
    </motion.div >
  )
}


function TrigonometryQuestion({ onEnd, equation }) {
  return (
    <motion.div {...animate} className='text-5xl hover:cursor-pointer'>
      <AnimatePresence>
        <motion.div {...animate}
          onTap={() => onEnd()}
          key="question"
        >
          <div className="opacity-20 pb-5 text-3xl">
            Question: (click for next)
          </div>
          <InlineMath math={equation} />
        </motion.div>
      </AnimatePresence >
    </motion.div >
  )
}

function solveDiff(eq) {
  eq = simplify(eq)
  var equation = eq.toTex().replace("log", "ln")
  var answer = simplify(derivative(eq, 'x')).toTex().replace("log", "ln")

  return { equation, answer }
}

function Differentiation({ onEnd }) {
  var { equation, answer } = solveDiff(generateDifferential())
  return (
    <DifferentiationQuestion
      onEnd={onEnd}
      equation={equation}
      answer={answer}
    />
  )
}

function* trig() {
  var initial = ["tan(x)", "cot(x)", "sin(x)", "cos(x)"]
  //random initial
  initial = initial[Math.floor(Math.random() * initial.length)]
  while (true) {
    initial = initial.replace("tan(x)", "(sin(x)/tan(x))")
    initial = initial.replace("tan^2x", "")
    initial = initial.replace("tan(x)", "(sin(x)/tan(x))")
    yield initial;
  }
}


function Trigonometry({ onEnd, equation, answer }) {
  var t = trig()

  // get first three values from generator
  var [a, b, c] = [t.next().value, t.next().value, t.next().value]

  return (
    <TrigonometryQuestion
      onEnd={onEnd}
      equation={parse(c).toTex() + "≡" + parse(c).toTex()}
    />
  )
}



function Intro({ onEnter, text }) {
  //framer motion fade out

  return (
    <motion.div {...animate}
      className='relative text-5xl hover:cursor-pointer text-blue-500 hover:text-blue-400 transition-colors' onTap={onEnter}>
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
    }, 210)
  }

  var onDiffEnd = () => {
    //alert("ended")
    setDiffAppeared(false)
    setTimeout(() => {
      setDiffAppeared(true)

      setEntered(true)
    }, 300)
  }

  /*
  
                <br />
                <Intro key="intro" onEnter={enterTrig} text={"Trigonometric Identities -->"} />
  */
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
