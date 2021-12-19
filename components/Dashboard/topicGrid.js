import Link from 'next/link'
import Topics from './topics'
import { Auth, Typography, Button } from '@supabase/ui'

export default function TopicGrid() {
    return <div class="lg:grid grid-cols-2 gap-3">
        {Topics.map(topic => <a
            key={topic.name}
        >
            {
                topic.active ?
                    <Link href={`/topics/${encodeURIComponent(topic.name)}`}>
                        <div className={
                            "my-4 lg:my-0 bg-gray-100 transition-all border h-32 lg:h-40 rounded-lg p-5 flex hover:border-gray-400 cursor-pointer"}>
                            <div className='m-auto'>
                                {topic.name}
                            </div>
                        </div>
                    </Link> :
                    <div className={
                        "my-4 lg:my-0 bg-gray-100  transition-all border h-32 lg:h-40 rounded-lg p-5 flex opacity-30"}>
                        <div className='m-auto'>
                            {topic.name}
                        </div>
                    </div>
            }
        </a>)
        }
    </div>
}
