import { FolderOpen } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { BranchVisualization } from './BranchVisualization'
import { RepoInput } from './RepoInput'

const Hero = () => {
  return (
    <section
      className="
    relative
    min-h-[calc(100vh-100px)]
    overflow-hidden

    bg-[#f7f7f5]
    text-black

    dark:bg-[#0b0f14]
    dark:text-white

    bg-[linear-gradient(#dfe3e8_1px,transparent_1px),linear-gradient(90deg,#dfe3e8_1px,transparent_1px)]
    bg-[size:24px_24px]

    dark:bg-[linear-gradient(#1a2430_1px,transparent_1px),linear-gradient(90deg,#1a2430_1px,transparent_1px)]
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
          <RepoInput />


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
          <BranchVisualization />
        </div>
      </div>
    </section>
  )
}

export default Hero