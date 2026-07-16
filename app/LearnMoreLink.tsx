export const LearnMoreLink = ({
  className = 'text-sm text-gray-400 mt-16 block hover:underline',
}: {
  className?: string
}) => (
  <a
    {...{ className }}
    href="https://github.com/dsernst/deal.siv.org#dealsivorg"
    target="_blank"
  >
    Learn more
  </a>
)
