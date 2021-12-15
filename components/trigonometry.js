import { InlineMath } from 'react-katex'
import animate from '../lib/animate'


import { motion, AnimatePresence, onTap } from "framer-motion"

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



export default function Trigonometry({ onEnd, equation, answer }) {
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
