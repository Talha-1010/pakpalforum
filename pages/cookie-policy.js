import { PageSEO } from '@/components/SEO'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
export default function CookiePolicy() {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`Cookie Policy | Pak-Palestine Forum`}
        description={'Cookie Policy for pakpalforum.com'}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 ">
            Cookie Policy
          </h1>
        </div>
        <div className="space-y-2 xl:space-y-0">
          <section className="mx-auto mt-4 max-w-screen-xl md:mt-8 ">
            <p className="py-4">Effective Date: 4/24/2025</p>
            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100  ">
              1. Introduction
            </h2>
            <p className="py-4">
              This Cookie Policy explains how pakpalforum.com (referred to as "we," "us," or "our")
              uses cookies and similar tracking technologies when you visit our website. By using
              our website, you consent to the use of cookies as described in this policy.
            </p>
            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100  ">
              2. What Are Cookies?
            </h2>
            <p className="py-4">
              Cookies are small text files that are placed on your computer or device when you visit
              a website. They help us improve your browsing experience and provide information about
              your usage patterns.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100  ">
              3. Types of Cookies We Use
            </h2>
            <p className="py-4">
              3.1. Essential Cookies: These cookies are necessary for the proper functioning of our
              website and cannot be disabled.
              <br /> 3.2. Analytical Cookies: We use these cookies to gather information about how
              visitors use our website to improve its performance.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100  ">
              4. Managing Cookies
            </h2>
            <p className="py-4">
              You can control and delete cookies through your browser settings. However, please note
              that disabling essential cookies may impact the functionality of our website.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100  ">
              5. Changes to Cookie Policy
            </h2>
            <p className="py-4">
              We may update this Cookie Policy from time to time. The updated policy will be posted
              on our website with a revised effective date.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100  ">
              6. Contact Us
            </h2>
            <p className="py-4">
              If you have any questions or concerns about this Cookie Policy, please contact us at
              pakpalforum@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
