import { useUser, RequireAuth } from '../../hooks/authUser'
import Heatmap from '../heatmap'
import TopicGrid from './topicGrid'

const activity = false;

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
                {activity && <div className='py-10 pb-20'>
                    <span className="text-4xl font-semibold">
                        Activity
                    </span>
                    <div className='pt-5 lg:w-2/5 xl:w-4/5'>
                        <Heatmap />
                    </div>
                </div>}
                <div className=''>
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