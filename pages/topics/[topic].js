import Question from '../../components/Question'
import Topics from '../../components/Dashboard/topics'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { RequireAuth } from '../../hooks/authUser'

export default function Topic({ onEnd, params }) {
    RequireAuth()

    var [appeared, setAppeared] = useState(true)
    const { topic } = params

    var generator = Topics.filter(t => topic == t.name)[0].generator
    console.log(generator)

    var { question, answer } = generator()

    var onEnd = () => {
        setAppeared(false)
        setTimeout(() => {
            setAppeared(true)
        }, 220)
    }

    return (
        <div className="h-screen cursor-pointer">
            <div className='ml-8 mt-5 xl:ml-32 absolute text-2xl font-medium text-blue-500'>
                <Link href="/"><span>{"<--"} Dashboard</span></Link>
            </div>
            <div className='flex h-4/5'>
                <div className='m-auto xl:pt-24'>
                    <AnimatePresence>
                        {appeared && <Question
                            onEnd={onEnd}
                            equation={question}
                            answer={answer}
                        />}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}
