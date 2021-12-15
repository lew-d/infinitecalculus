import { derivative, simplify } from 'mathjs'
import { BlockMath } from 'react-katex'
import animate from '../lib/animate'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, onTap } from "framer-motion"

function solveDiff(eq) {
    eq = simplify(eq)
    var equation = eq.toTex().replace("log", "ln")
    var answer = simplify(derivative(eq, 'x')).toTex().replace("log", "ln")

    return { equation, answer }
}


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
        "A/B", "A/sin(A)", "tan(A)/A", "B/cot(A)",
        "B+log(A)", "B+log(A)", "sin(A)+log(A)", "sin(A)^2", "log(A)log(A)",
        "A*cos(A)", "B*e^A"
    ]

    // random base
    var base = bases[Math.floor(Math.random() * bases.length)]

    base = replaceAllInstances(base, "A", randomA)
    base = replaceAllInstances(base, "B", randomB)

    base = replaceAllInstances(base, "A", randomA)
    base = replaceAllInstances(base, "B", randomB)

    return base
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
        <motion.div {...animate} className='text-4xl hover:cursor-pointer'>
            <AnimatePresence>
                {hideAnswer &&
                    <motion.div {...animate}
                        onTap={findAnswer}
                        key="question"
                    >
                        <div className="opacity-20 text-3xl">
                            Question: (click for next)
                        </div>
                        <BlockMath math={"y=" + equation} />

                    </motion.div>
                }

                {
                    answerAppeared &&
                    <motion.div  {...animate}
                        onTap={() => onEnd()}
                        key="Answer"
                    >
                        <div className="opacity-20 text-3xl">
                            Answer: (click for next)
                        </div>
                        <BlockMath math={"\\frac{dy}{dx}=" + answer} />
                    </motion.div>
                }
            </AnimatePresence >
        </motion.div >
    )
}


export default function Differentiation({ onEnd }) {
    var { equation, answer } = solveDiff(generateDifferential())
    return (
        <DifferentiationQuestion
            onEnd={onEnd}
            equation={equation}
            answer={answer}
        />
    )
}
