import { Auth, Typography, Button } from '@supabase/ui'
import { useUser, RequireAuth } from '../../hooks/authUser'
import Topics from './topics'
import Heatmap from '../heatmap'
import Link from 'next/link'

function TopicGrid() {
    return <div class="lg:grid space-y-5 lg:space-y-0 grid-cols-2 gap-3">
        {Topics.map(topic => <a
            key={topic.name}
        >
            {
                topic.active ?
                    <Link href={`/topics/${encodeURIComponent(topic.name)}`}>
                        <div className={
                            "bg-gray-100  transition-all border h-32 lg:h-40 rounded-lg p-5 flex hover:border-gray-400 cursor-pointer"}>
                            <div className='m-auto'>
                                {topic.name}
                            </div>
                        </div>
                    </Link> :
                    <div className={
                        "bg-gray-100  transition-all border h-32 lg:h-40 rounded-lg p-5 flex opacity-30"}>
                        <div className='m-auto'>
                            {topic.name}
                        </div>
                    </div>
            }
        </a>)
        }
    </div>
}

export default function Dashboard() {
    RequireAuth()

    const { user } = useUser()

    return <>
        <div className='w-screen px-5 lg:px-16 xl:px-32 xl:flex pt-10 space-y-10 xl:space-y-0 xl:space-x-16'>
            <div className='xl:w-3/5 space-y-5'>
                <span className="text-4xl font-semibold">
                    Revise <div className='h-5'></div>
                </span>
                <div className='xl:pt-2 lg:w-2/3 xl:w-auto'>
                    <TopicGrid />
                </div>
            </div>
            <div className='xl:w-2/5 lg:divide-y-0 divide-y-2 divide-dotted'>
                <div className='py-10'>
                    <span className="text-4xl font-semibold">
                        Activity
                    </span>
                    <div className='pt-5 lg:w-2/5 xl:w-4/5'>
                        <Heatmap />
                    </div>
                </div>
                <div className='py-10'>
                    <span className="text-4xl font-semibold">
                        Account
                    </span>
                    <div className='pt-5 w-2/3 space-y-2'>
                        <p>Email: {user.email}</p>
                        <p>Account created: {new Date(user.created_at).toLocaleDateString()}</p>
                        <p>Last sign in: {new Date(user.last_sign_in_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}