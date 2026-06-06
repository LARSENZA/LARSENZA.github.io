export default function LarsenMathSite() {
  const testimonials = [
    {
      quote:
        "My son enjoys working with Larsen. He is a very dedicated Maths tutor and very patient. It is really a blessing having him as my son's tutor. I am certain my son was going to choose pure maths in Grade 10 if he had Larsen as his tutor from Grade 8. I wish and plan to have him as my daughter's Maths tutor next year as she will be in Grade 8.",
      author: "Parent, South Africa",
    },
    {
      quote:
        "I’m following very closely on the lessons, and I found Larsen to be very professional. I found his lessons encouraging. My child is also giving similar feedback and is now used to working with Larsen. I like the passion!",
      author: "Parent, South Africa",
    },
    {
      quote:
        "The tutor was so great. He went through the theory in depth and assisted in answering questions that I struggled with. After the session, I was quite confident that I had gained more knowledge than I had gained in my lectures!",
      author: "Student",
    },
    {
      quote:
        "Those 3-hour sessions felt like 10 minutes because of how informative and enjoyable the tutor made them. We’re truly grateful and I hope we all make you proud.",
      author: "Students",
    },
    {
      quote:
        "I love the way the tutor explained concepts. The teaching style is easy to understand and many of my questions were answered in a simple and clear way.",
      author: "Student",
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <a
  href="#top"
  className="flex items-center justify-center sm:justify-start gap-2 text-lg font-semibold no-underline text-gray-900"
>
            <img
  src="/favicon2.svg"
  alt="Larsen Math Academy logo"
  className="w-6 h-6"
/>
<span>Larsen Math Academy</span>
          </a>
          <nav className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
  <a href="#about" className="text-gray-600 hover:text-gray-900">
    About
  </a>
  <a href="#resources" className="text-gray-600 hover:text-gray-900">
    Resources
  </a>
  <a
    href="https://wa.me/27794083205"
    target="_blank"
    rel="noreferrer"
    className="text-green-600"
  >
    WhatsApp
  </a>

  <a href="#book" className="text-blue-600">
    Book
  </a>
</nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Grade 10–12 Math Support
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Clear explanations, structured online lessons, and patient support to help
            IEB, CAPS and Cambridge International high school students improve confidence, exam readiness and marks.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#book"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Book a lesson
            </a>

            <a
              href="https://wa.me/27794083205"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Chat on WhatsApp
            </a>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Online via Microsoft Teams • We confirm availability and pricing
            before booking
          </p>
        </section>

        {/* Credibility */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-gray-600 mt-1">Hours of 1:1 tutoring</div>
            </div>
            <div>
              <div className="text-2xl font-bold">8+</div>
              <div className="text-gray-600 mt-1">
                Years of tutoring experience
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">Verified</div>
              <div className="text-gray-600 mt-1">Tutor on TeachMe2</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 mt-6 text-center text-sm text-gray-500">
            Larsen has also tutored through multiple platforms, including
            TeachMe2, one of South Africa’s leading tutoring platforms.{" "}
            <a
              href="https://www.teachme2.co.za/tutors/larsen-30528"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline ml-1"
            >
              View profile
            </a>
          </div>
        </section>

        {/* OFFER */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-center">
            Choose the right option
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold">Private Lessons (1:1)</h3>
              <p className="mt-3 text-gray-600">
                Personalised support focused on your child’s exact gaps and
                goals.
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>• Fully tailored sessions</li>
                <li>• Faster progress</li>
                <li>• Limited availability</li>
              </ul>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold">Group Sessions</h3>
              <p className="mt-3 text-gray-600">
                Structured lessons covering key topics with other students.
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>• Fridays, Saturdays, Sundays</li>
                <li>• More affordable option</li>
                <li>• Strong foundations built weekly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-center">How it works</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-lg font-semibold">1. Send a request</div>
                <p className="mt-2 text-gray-600">
                  Tell me your child’s grade and challenges
                </p>
              </div>
              <div>
                <div className="text-lg font-semibold">2. Get options</div>
                <p className="mt-2 text-gray-600">
                  I’ll suggest private or group sessions
                </p>
              </div>
              <div>
                <div className="text-lg font-semibold">3. Start lessons</div>
                <p className="mt-2 text-gray-600">
                  All sessions run online via Teams
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-gray-50 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-center">
              What parents and students are saying
            </h2>
            <div className="mt-10 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-50 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-50 to-transparent z-10" />

              <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
                <div
                      className="flex gap-6 w-max animate-[testimonial-scroll_70s_linear_infinite] hover:[animation-play-state:paused]"
                      onTouchStart={(e) => {
                        e.currentTarget.style.animationPlayState = "paused";
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.animationPlayState = "running";
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = "paused";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animationPlayState = "running";
                      }}
                    >
                  {duplicatedTestimonials.map((item, index) => (
                    <div
                      key={`${item.author}-${index}`}
                      className="w-[340px] md:w-[420px] shrink-0 p-6 border rounded-xl bg-white shadow-sm"
                    >
                      <p className="text-gray-700 leading-7">“{item.quote}”</p>
                      <div className="mt-4 text-sm text-gray-500">
                        — {item.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Hover or swipe to pause and read at your own pace.
            </p>
          </div>
        </section>

        {/* BOOKING */}
        <section id="book" className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-center">
            Request a lesson
          </h2>
          <p className="text-center text-gray-600 mt-2">
            I’ll reply within 24 hours with availability and next steps
          </p>

          {/*  //Calendly for future usage
          <div className="mt-6 text-center">
            <a
              href="https://calendly.com/larsenmath"
              target="_blank"
              className="inline-block mb-6 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium"
            >
              View Available Time Slots
            </a>
          </div> */}
          <div className="mt-8 rounded-2xl border bg-white overflow-hidden shadow-sm">
            <iframe
              src="https://tally.so/r/xXNLLE?transparentBackground=1"
              title="Request a lesson"
              className="w-full h-[1200px] md:h-[900px] lg:h-[850px]"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            />
          </div>
          <div className="mt-4 space-y-4">
            {/* <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Parent name"
            />
            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Email address"
            />
            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Student grade (10, 11 or 12)"
            />
            <select className="w-full border rounded-lg px-4 py-3">
              <option>Preferred option</option>
              <option>Private (1:1)</option>
              <option>Group (Fri–Sun)</option>
            </select>
            <textarea
              className="w-full border rounded-lg px-4 py-3"
              rows={4}
              placeholder="What does your child need help with?"
            />

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold">
              Request lesson
            </button> */}

            <p className="text-center text-sm text-gray-500">
              No commitment. No upfront payment.
            </p>
            {/* BACK TO TOP */}
            <div className="fixed bottom-6 right-6">
              <a
                href="#top"
                className="bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg text-sm font-medium hover:bg-blue-700"
              >
                ↑ Top
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
