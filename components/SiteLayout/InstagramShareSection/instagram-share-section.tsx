import {
  instagramPostCards,
  type InstagramPostCard,
} from '@/data/site-content';

type InstagramShareSectionProps = {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  posts?: InstagramPostCard[];
};

export function InstagramShareSection({
  className = 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-white pb-10 md:pb-16',
  titleClassName = '[font-family:var(--font-playfair)] text-[36px] font-semibold leading-[1.12] text-[#19161d] md:text-[46px]',
  descriptionClassName = 'mx-auto mt-4 max-w-[1000px] [font-family:var(--font-montserrat)] text-[20px] leading-normal text-[#5c5660] md:text-[22px]',
  title = 'Share the love',
  titleAccent = '#AnnabelKarmel',
  description = 'Follow us on Instagram for exclusive recipes, competitions and lots more tasty content!',
  posts = instagramPostCards,
}: InstagramShareSectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-[1120px] px-[30px] text-center">
        <h3 className={titleClassName}>
          {title} <span className="text-[#b34769]">{titleAccent}</span>
        </h3>
        <p className={descriptionClassName}>{description}</p>
      </div>

      <div className="mt-9 overflow-x-auto overflow-y-hidden scrollbar-hide [-webkit-overflow-scrolling:touch] pb-2 sm:mx-auto sm:max-w-[1120px] sm:overflow-visible sm:px-[30px] sm:pb-0">
        <div className="flex w-max gap-2 px-[30px] sm:grid sm:w-full sm:grid-cols-2 sm:gap-2 sm:px-0 md:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, index) => (
            <a
              key={`${post.href}-${index}`}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square w-[min(78vw,300px)] max-w-[320px] shrink-0 overflow-hidden bg-[#f3f3f3] sm:max-w-none sm:w-full sm:shrink"
              aria-label={`Open Instagram post ${index + 1}`}
            >
              <img
                src={post.image}
                alt={`Instagram post ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                draggable={false}
              />
              {post.kind === 'carousel' ? (
                <span
                  className="pointer-events-none absolute right-2 top-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 26 26"
                    width="26"
                    height="26"
                    className="text-white"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="15"
                      height="15"
                      rx="2.5"
                      fill="rgba(0,0,0,0.22)"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="9"
                      y="9"
                      width="15"
                      height="15"
                      rx="2.5"
                      fill="rgba(0,0,0,0.35)"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              ) : null}
              {post.kind === 'video' ? (
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.45)]"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 64 72"
                    width="64"
                    height="72"
                    className="fill-current"
                    aria-hidden
                  >
                    <path
                      d="M14 10 L14 62 L54 36 Z"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
