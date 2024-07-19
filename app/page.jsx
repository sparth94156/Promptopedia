import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>
      <p>
        Promptopedia is an open source AI prompting tool 
        for modern world to dicover, create and share creative prompts
      </p>
      {/* Because feed will be there throughout all routes */}
      <Feed/>

    </section>
  );
};

export default Home;
