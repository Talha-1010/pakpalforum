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
export default function PrivacyPolicy() {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`Privacy Policy | Pak-Palestine Forum`}
        description={'Privacy Policy for pakpalforum.com'}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 ">
            Privacy Policy
          </h1>
        </div>
        <div className="space-y-2 xl:space-y-0">
          <section className="mx-auto mt-4 max-w-screen-xl md:mt-8 ">
            <p className="py-4">Effective Date: 4/24/2025</p>
            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              1. Introduction
            </h2>
            <p className="py-4">
              Welcome to pakpalforum.com (referred to as "we," "us," or "our"). We respect your
              privacy and are committed to protecting your personal information in accordance with
              Islamic Republic of Pakistan data protection laws and regulations. This Privacy Policy
              outlines how we collect, use, disclose, and protect your data when you visit our
              website or use our services. By accessing or using our website or services, you
              consent to the practices described in this Privacy Policy.
            </p>
            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              2. Information We Collect
            </h2>
            <p className="py-4">
              2.1. Personal Information: We may collect personal information, such as your name,
              email address, phone number, and other identifying information, when you provide it to
              us voluntarily, such as when you fill out contact forms, book appointments, or
              subscribe to our newsletter.
              <br /> 2.2. Non-Personal Information: We may also collect non-personal information,
              such as your IP address, browser type, and usage data, to improve our website and
              services.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              3. How We Use Your Information
            </h2>
            <p className="py-4">
              We may use your information for the following purposes:
              <br /> 3.1.To provide and maintain our services.
              <br /> 3.2. To communicate with you, respond to your inquiries, and send you relevant
              information.
              <br /> 3.3. To improve our website and services.
              <br /> 3.4. To comply with legal obligations under Islamic Republic of Pakistan data
              protection laws.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              4. How We Share Your Information
            </h2>
            <p className="py-4">
              We may share your information with third parties under the following circumstances:
              <br />
              4.1. With your explicit consent.
              <br /> 4.2. To third-party service providers who assist us in operating our website
              and providing services, provided they also comply with Islamic Republic of Pakistan
              data protection laws.
              <br /> 4.3. To comply with legal obligations or protect our rights in accordance with
              Islamic Republic of Pakistan data protection laws.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="py-4">
              We may use cookies and similar tracking technologies to collect information about your
              browsing behavior on our website. You can manage your cookie preferences through your
              browser settings.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              6. Security
            </h2>
            <p className="py-4">
              We take reasonable measures to protect your information from unauthorized access,
              disclosure, alteration, or destruction, in accordance with Islamic Republic of
              Pakistan data protection laws.
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              7. Your Rights
            </h2>
            <p className="py-4">
              You have the following rights regarding your personal information in accordance with
              Islamic Republic of Pakistan data protection laws:
              <br /> 7.1. The right to access your data.
              <br /> 7.2. The right to correct inaccuracies in your data.
              <br /> 7.3. The right to delete your data (subject to legal requirements).
              <br /> 7.4. The right to object to the processing of your data.
              <br /> 7.5. The right to data portability (subject to legal requirements).
            </p>

            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              8. Changes to This Privacy Policy
            </h2>
            <p className="py-4">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices. The updated Privacy Policy will be posted on our website with a revised
              effective date.
            </p>
            <h2 className="py-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 ">
              9. Contact Us
            </h2>
            <p className="py-4">
              If you have any questions or concerns about this Privacy Policy or our data practices
              in compliance with Islamic Republic of Pakistan data protection laws, please contact
              us at official@pakpalforum.com.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
