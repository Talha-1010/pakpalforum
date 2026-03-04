export default function CardsGrid({
  next_h1,
  next_s1,
  next_s2,
  next_s2_note,
  next_s3,
  next_s1_2,
  next_s2_2,
  next_s3_2,
}) {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      title: next_s1,
      title2: next_s1_2,
      note: '',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: next_s2,
      title2: '',
      note: next_s2_note,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.',
    },
  ]

  return (
    <section className="py-14">
      <div className="mx-auto max-w-screen-xl px-4  text-gray-600 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="text-3xl font-thin leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 ">
              {next_h1}
            </h2>
            {/* <p className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.
                        </p> */}
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(211, 211, 211, 0.2) 4.54%, rgba(211, 211, 211, 0.26) 34.2%, rgba(211, 211, 211, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <div className="relative mt-12 ">
          <ul className="grid gap-8 sm:grid-cols-2 ">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col space-y-0 rounded-lg border bg-gray-100 p-4 hover:cursor-pointer hover:bg-gray-200 dark:bg-black "
              >
                <div className=" self-center pb-3  text-[#1FC2C2] dark:text-gray-50">
                  {item?.icon}
                </div>
                <h2 className="font-base self-center text-center text-xl text-gray-800 dark:text-gray-100  ">
                  {item?.title}
                </h2>
                <h2 className="font-base  self-center text-center text-xl text-gray-800 dark:text-gray-100 ">
                  {item?.title2}
                </h2>
                <p className="text-center text-xs text-gray-600 dark:text-gray-400">{item?.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
