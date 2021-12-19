import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import animate from '../../lib/animate'
import { BlockMath } from 'react-katex'

export default function Question({ onEnd, equation, answer }) {


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
                        <BlockMath math={equation} />

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
                        <BlockMath math={answer} />
                    </motion.div>
                }
            </AnimatePresence >
        </motion.div >
    )
}
