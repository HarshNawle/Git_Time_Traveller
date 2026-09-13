import { ArrowRight, FolderOpen, Link2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

const Hero = () => {
  return (
    <section
      id="explore"
      className="
        relative
        min-h-[calc(100vh-100px)]
        overflow-hidden
        px-5
        py-10
        md:px-10
        lg:px-16
      "
    >
      {/* Dark diagonal background */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[-10%]
          h-[125%]
          w-[55%]
          bg-[#171c22]
          [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1580px]
          items-center
          gap-8
          lg:grid-cols-[0.95fr_1.05fr]
        "
      >
        {/* LEFT */}
        <div className="relative z-20 pt-8 lg:pt-0">

          {/* Pills */}
          <div className="mb-7 flex flex-wrap gap-3">

            <Badge
              variant="outline"
              className="
                rounded-full
                border-2
                border-black
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                shadow-[2px_2px_0px_#09090b]
              "
            >
              <span className="mr-2 text-blue-500">●</span>
              VISUALIZE
            </Badge>

            <Badge
              variant="outline"
              className="
                rounded-full
                border-2
                border-black
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                shadow-[2px_2px_0px_#09090b]
              "
            >
              <span className="mr-2 text-violet-500">●</span>
              EXPLORE
            </Badge>

            <Badge
              variant="outline"
              className="
                rounded-full
                border-2
                border-black
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                shadow-[2px_2px_0px_#09090b]
              "
            >
              <span className="mr-2 text-green-500">●</span>
              UNDERSTAND
            </Badge>

          </div>

          {/* Heading */}
          <h1
            className="
              max-w-[700px]
              text-[54px]
              font-black
              leading-[0.92]
              tracking-[-0.055em]
              text-black
              sm:text-6xl
              md:text-7xl
              xl:text-[88px]
            "
          >
            Git History

            <span
              className="
                mt-1
                block
                bg-gradient-to-r
                from-blue-600
                via-violet-600
                to-purple-700
                bg-clip-text
                text-transparent
              "
            >
              Time Traveller
            </span>
          </h1>

          {/* Main statement */}
          <h2
            className="
              mt-7
              max-w-[680px]
              text-xl
              font-bold
              leading-8
              text-slate-900
              md:text-2xl
            "
          >
            Turn commit history into a visual story.
          </h2>

          {/* Description */}
          <p
            className="
              mt-3
              max-w-[650px]
              text-base
              leading-7
              text-slate-600
              md:text-lg
            "
          >
            Explore how a project evolved, identify hotspots,
            understand contributors, and uncover insights —
            all in one interactive experience.
          </p>

          {/* Repository form */}
          <div
            className="
              mt-8
              flex
              max-w-[680px]
              flex-col
              overflow-hidden
              rounded-2xl
              border-[3px]
              border-black
              bg-white
              p-1
              shadow-[6px_6px_0px_#09090b]
              sm:flex-row
            "
          >
            <div className="relative flex min-w-0 flex-1 items-center">
              <Link2
                className="
                  absolute
                  left-4
                  size-5
                  text-blue-600
                "
              />

              <Input
                placeholder="Paste a GitHub repository URL..."
                className="
                  h-14
                  border-0
                  bg-transparent
                  pl-12
                  text-base
                  shadow-none
                  focus-visible:ring-0
                "
              />
            </div>

            <Button
              className="
                h-14
                rounded-xl
                border-2
                border-black
                bg-gradient-to-r
                from-blue-500
                to-violet-600
                px-8
                text-base
                font-bold
                text-white
              "
            >
              Visualize
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </div>

          {/* OR */}
          <div className="my-5 flex max-w-[680px] items-center gap-4">
            <div className="h-[2px] flex-1 bg-slate-300" />

            <span className="font-medium text-slate-500">
              or
            </span>

            <div className="h-[2px] flex-1 bg-slate-300" />
          </div>

          {/* Local repo */}
          <Button
            variant="outline"
            size="lg"
            className="
              h-13
              rounded-xl
              border-2
              border-black
              bg-white
              px-6
              font-semibold
              text-blue-700
              shadow-[4px_4px_0px_#09090b]
              hover:bg-blue-50
            "
          >
            <FolderOpen className="mr-3 size-5" />
            Choose Local Repository
          </Button>
        </div>

        {/* RIGHT */}
        <div className="relative min-h-[550px]">
          {/* We add BranchVisualization here */}
        </div>
      </div>
    </section>
  )
}

export default Hero