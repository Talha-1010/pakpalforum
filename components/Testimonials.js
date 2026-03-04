import styles from './Testimonials.module.css'
import Image from 'next/image'
export default function Testimonials({
  testimonial_h1,
  testimonial_t1,
  testimonial_q1,
  testimonial_t2,
  testimonial_q2,
  testimonial_t3,
  testimonial_q3,
}) {
  const testimonials = [
    {
      avatar: '/static/images/usman.jpg',
      name: 'Usman Khan',
      title: testimonial_t1,
      quote: testimonial_q1,
    },
    {
      avatar: '/static/images/usman.jpg',
      name: 'K.S.',
      title: testimonial_t2,
      quote: testimonial_q2,
    },
    {
      avatar: '/static/images/usman.jpg',
      name: 'Lia Stoll',
      title: testimonial_t3,
      quote: testimonial_q3,
    },
  ]

  return (
    <section className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h2 className="text-3xl font-thin leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {testimonial_h1}
          </h2>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <li key={idx} className="rounded-xl bg-gray-50 p-4 dark:bg-black">
                <figure>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <span className="block font-semibold text-gray-800 dark:text-white">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-gray-600 dark:text-white">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 text-gray-700 dark:text-white">{item.quote}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
