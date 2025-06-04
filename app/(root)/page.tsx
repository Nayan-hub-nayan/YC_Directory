
import SearchForm from '@/components/SearchForm'
import StartupCard, {StartupTypeCard} from '@/components/StartupCard'
import {STARTUPS_QUERY} from '@/sanity/lib/queries'
import { sanityFetch, SanityLive} from '@/sanity/lib/live'





export default async function Home({searchParams}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query= (await searchParams).query; // fetch query

  const params = {search: query || null}

  //const posts = await client.fetch(STARTUPS_QUERY, params); //fetch post from sanity client */

  const {data: posts }= await sanityFetch({query: STARTUPS_QUERY, params}); //fetch  revalidate post from sanity client */


  // const posts= [{

  //       _createdAt: new Date(),
  //       views: 55,
  //       author:{ _id: 1 , name: 'Nayan'},
  //       _id: 1,
  //       description: 'this is a description',
  //       image: './desktop.jpg',
  //       category:'Robots',
  //       title: 'We Robots'

  //   }]
  return (
    <div >
       <section className='pink_container '>
          <h1 className='heading'>Pich Your Startup, <br/>
          Connect With Enterpreneurs</h1>

          <p className="sub-heading !max-w-3xl">
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          </p>
         <SearchForm query= {query}/>
        </section>

        <section className="section_container">
        <p className="text-30-semibold">
            {query? `Search result for "${query}"` : 'All Startup'}
            </p>

            <ul className='mt-7 card_grid'>
              { posts?.length > 0 ?(
              posts.map((post: StartupTypeCard) => (
                <StartupCard  key={post?._id} post={post} />
              ))
            
            ):(
              <p className="no-results  ">No startups found</p>
            )}
              
            </ul> 
        </section>
        <SanityLive/>

    </div>
  );
}
