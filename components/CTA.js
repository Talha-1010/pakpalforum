import Link from 'next/link'

export default function CTA({ cta_h1_pt1, cta_h1_pt2, cta_h1_pt3, cta_subheading, t }) {
  return (
    <section className="bg-gray-50 py-14 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 md:text-center">
        <div className="max-w-xl md:mx-auto">
          <h2 className="font-base bg-gradient-to-r from-[#77E4D9] via-[#1FC2C2] to-[#30D5C8] bg-clip-text text-3xl text-transparent">
            {cta_h1_pt1}{' '}
            <span className="bg-gradient-to-r from-[#77E4D9] via-[#1FC2C2] to-[#30D5C8] bg-clip-text text-center text-4xl font-semibold leading-10 tracking-tight text-transparent dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              <span className="text-6xl">{cta_h1_pt2}</span>
            </span>{' '}
            <span className="bg-gradient-to-r from-[#77E4D9] via-[#1FC2C2] to-[#30D5C8] bg-clip-text text-transparent">
              {cta_h1_pt3}
            </span>
          </h2>

          <p className="mt-3 text-gray-600">{cta_subheading}</p>
        </div>
        <div className="mt-4 flex items-center gap-3 md:justify-center">
          <Link
            href="/join-us"
            className="inline-block rounded-lg bg-[#1FC2C2] py-2 px-4 font-medium text-white shadow-md duration-150 hover:bg-[#0E8E8E] hover:shadow-none active:bg-gray-900"
          >
            {t('common:join')}
          </Link>
        </div>
      </div>
    </section>
  )
}
