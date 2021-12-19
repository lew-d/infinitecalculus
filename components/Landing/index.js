import Link from 'next/link'
import Heatmap from '../heatmap'
import TopicGrid from '../Dashboard/topicGrid'

export default function LandingPage() {


    return <div>
        <div className="py-10 px-2 sm:px-6 lg:px-28">
            <div className="inline-block xl:align-middle xl:w-2/5 text-5xl m-5 lg:m-10 my-0 xl: xl:m-0 lg:text-6xl font-bold pb-16 lg:pb-5 xl:pb-10 xl:pr-20">
                Improve your maths skills with our online question generator.
            </div>
            <img src="/screenshot.png" className="xl:w-3/5 xl:align-middle xl:inline-block"></img>
        </div>

        <div className="w-screen text-3xl text-center py-10 pb-20 px-5 sm:px-6 lg:px-28">
            <Link href="/auth">
                <span className="p-5 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors">
                    Create a free account and improve your maths today
                </span>
            </Link>
        </div>

        <div className='px-5 lg:px-16 pb-12'>
            <TopicGrid />
        </div>

        <div className='bg-gray-50 py-20 px-2 sm:px-6 lg:px-28'>
            <div className='hidden lg:block'>
                {<>

                    <div className='justify-center lg:flex'>
                        <div className=" lg:w-2/3 xl:w-1/2">
                            <Heatmap />
                        </div>
                        <div className='text-4xl align-middle xl:text-5xl ml-16 font-semibold pt-10'>
                            Visualise your revision patterns
                        </div>
                    </div>
                </>}
            </div>
            <div className='lg:hidden'>
                {<>
                    <div className='justify-center lg:flex'>
                        <div className='text-4xl xl:text-5xl ml-10 font-semibold pt-10'>
                            Visualise your revision patterns
                        </div>
                        <div className="p-5 lg:w-2/3 xl:w-1/2">
                            <Heatmap />
                        </div>
                    </div>
                </>}
            </div>
        </div>
    </div >
}