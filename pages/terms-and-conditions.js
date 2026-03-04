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
export default function TermsAndConditions() {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`Terms of Service | Pak-Palestine Forum`}
        description={'Terms of Service for pakpalforum.com'}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 ">
            Terms of Service
          </h1>
        </div>
        <div className="space-y-2 xl:space-y-0">
          <section className="mx-auto mt-4 max-w-screen-xl md:mt-8 ">
            <p className="py-4">Effective Date: 04/24/2025</p>
            <p className="py-4">
              Welcome to Pak-Palestine Forum. By accessing or engaging with our platform — including
              applying to be featured, collaborating with us, or benefiting from exposure via our
              social media pages — you agree to abide by the following Terms of Service ("Terms").
              If you do not agree to these Terms, please do not proceed.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              1. About Pak-Palestine Forum
            </h2>
            <p className="py-4">
              Pak-Palestine Forum is a value-driven social initiative that promotes ethical
              businesses through a collective of high-reach Instagram pages and other digital
              platforms. We are not a marketing agency, and we do not sell marketing services. Our
              collaborations are mission-based, not transactional.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              2. Eligibility
            </h2>
            <p className="py-4">
              To participate:
              <br /> ● You must be a registered business or have a verifiable product/service.
              <br /> ● You must align with the moral, ethical, and social values promoted by
              Pak-Palestine Forum.
              <br /> ● You must agree to the donation and awareness responsibilities outlined below.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              3. Nature of Participation
            </h2>
            <p className="py-4">
              Participating businesses must acknowledge that:
              <br /> ● No results are guaranteed (sales, engagement, traffic, or leads).
              <br /> ● All exposure is organic and based on the performance of social media
              algorithms.
              <br /> ● Participation is at our discretion, and we may decline or cancel any
              collaboration without notice.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              4. Business Responsibilities
            </h2>
            <p className="py-4">
              By partnering with Pak-Palestine Forum, you agree to:
              <br /> ● Donate a portion of your profits to causes, campaigns, or community work
              approved by Pak-Palestine Forum.
              <br /> ● Contribute at least one product or campaign to raise awareness on a relevant
              social, spiritual, or ethical issue.
              <br /> ● Provide free products or offers (when reasonable) to support giveaways or
              impactful promotional efforts.
              <br /> ● Operate your business with honesty, integrity, and ethical practices.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              5. Prohibited Conduct
            </h2>
            <p className="py-4">
              You agree NOT to:
              <br /> ● Misrepresent your business, products, or intentions.
              <br /> ● Abuse, exploit, or misuse the Pak-Palestine Forum platform in any way.
              <br /> ● Use our name, likeness, or content for misleading advertising or personal
              gain without written permission.
              <br /> ● Engage in any conduct that could harm our reputation or community.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              6. Termination
            </h2>
            <p className="py-4">
              Pak-Palestine Forum reserves the right to terminate this collaboration under the
              following conditions:
              <br /> ● Standard Termination: We may terminate the partnership by giving a 24-hour
              written notice, with or without providing a reason.
              <br /> ● Immediate Termination for Misconduct: If the Business Partner is found to be
              misrepresenting, abusing the platform, violating our values, or engaging in fraudulent
              or unethical behavior, Pak-Palestine Forum reserves the right to terminate the
              partnership immediately and without any prior notice.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              7. Disclaimers
            </h2>
            <p className="py-4">
              ● Pak-Palestine Forum does not guarantee any marketing success, visibility, revenue,
              or social growth.
              <br /> ● All promotions are subject to platform behavior (Instagram, etc.) which is
              outside of our control.
              <br /> ● We are not responsible for how audiences respond to your content or brand.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              8. Intellectual Property
            </h2>
            <p className="py-4">
              You grant Pak-Palestine Forum the right to use your business name, product images, and
              content for posts, promotions, and awareness campaigns. All content created by us
              remains our property unless stated otherwise.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              9. Limitation of Liability
            </h2>
            <p className="py-4">
              Pak-Palestine Forum is not liable for:
              <br /> ● Any financial loss, brand damage, or negative public reception.
              <br /> ● Disputes or damages arising from your business practices or products.
              <br /> ● Any technical failure or delay in exposure due to platform restrictions or
              outages.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              10. Modifications
            </h2>
            <p className="py-4">
              We reserve the right to update or revise these Terms at any time. Continued
              participation implies acceptance of the latest version.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              11. Governing Law
            </h2>
            <p className="py-4">
              These Terms are governed by the laws of the Islamic Republic of Pakistan.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
