import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center
     flex-col">
        <h1 className="head_text text-center">
            Explore & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> AI-Optimized Prompts</span>
        </h1>
        <p className="desc text-center">
          PromptHive is an AI-optimized platform for discovering, engineering, 
          and sharing innovative prompts to inspire creativity and drive solutions.<br />
          Gather inspiration, share your ideas, and connect with like-minded individuals globally
        </p>

        <Feed />
     </section>
  )
}

export default Home
