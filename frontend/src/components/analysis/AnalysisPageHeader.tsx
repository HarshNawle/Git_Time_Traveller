const AnalysisPageHeader = () => {
    return (
      <section className="py-10 text-center">
        <h1
          className="
            text-5xl
            p-1
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-green-400
            via-purple-400
            to-[#c9b6ff]
            bg-clip-text
            text-transparent
          "
        >
          Analyzing Repository
        </h1>
  
        <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-slate-600 dark:text-slate-400">
          We're fetching and processing the complete Git history.
          <br />
          This may take a few minutes...
        </p>
      </section>
    );
  };
  
  export default AnalysisPageHeader;