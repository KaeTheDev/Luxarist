/**
 * @name NewsletterSection
 * @description A visually engaging newsletter signup section that encourages users 
 *  to join the brand’s private mailing list. Handles input validation, submission state, 
 *  and feedback messages for a polished user experience.
 * 
 * @composition
 * - Uses `useState` to manage email input, submission status, and error messages.
 * - Renders an input field and call-to-action button for email collection.
 * - Displays success or error messages based on user interaction.
 * - Includes decorative gradient overlays and separation lines for visual depth.
 * 
 * @styling
 * - **Layout**: Centered, responsive design with flexible stacking for mobile and desktop.
 * - **Typography**: Luxury-focused, light font weights with tight tracking and italic accent.
 * - **Interaction**: Smooth hover, focus, and click animations on input and button elements.
 * - **Colors**: Dark background with white and semi-transparent overlays for high-contrast elegance.
 * 
 * @responsibilities
 * - Collect user email addresses for newsletter or private access signups.
 * - Validate input and provide immediate feedback to the user.
 * - Show confirmation message upon successful submission.
 * - Maintain visually premium styling consistent with brand identity.
 * 
 * @usage
 * - Import and render as part of a landing page or marketing section.
 * - Example:
 *      <NewsletterSection />
 * - Can be extended to integrate with real backend email collection services.
 */

import { useState } from "react";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if(!email.includes("a")) {
            setError("Please enter a valid email address.");
            
            return;
        }

        setError("");
        setSubmitted(true);

        // Fake delay to simulate request
        setTimeout(() => {
            setEmail("");
        }, 800);
    };

    return (
      <section className="relative w-full bg-[#080808] py-32 px-6 overflow-hidden border-t border-white/5">
        {/* Separation Line: High-end razor-edge gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center, var(--tw-gradient-stops))] from-white/3 to-transparent pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
        <span className="text-xs tracking-[0.4em] uppercase text-gray-500 mb-8 block font-medium">
          Private Access
        </span>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight tracking-tight">
            Join The Inner Circle
        </h3>

        <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed font-light italic">
            Exclusive releases. Early access. Refined updates.
        </p>

        {!submitted ? (
          <>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="flex-1 px-8 py-4 rounded-full 
                bg-white/4 border border-white/10 
                text-white placeholder:text-gray-600
                focus:outline-none focus:border-white/40 focus:bg-white/8
                transition-all duration-300"
              />

              <button
                onClick={handleSubmit}
                className="px-10 py-4 rounded-full 
                bg-white text-black font-bold tracking-wider text-xs uppercase
                hover:bg-gray-200 hover:-translate-y-0.5
                active:translate-y-0
                transition-all duration-300 shadow-xl shadow-white/5"
              >
                Request Access
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 mt-4">{error}</p>
            )}
          </>
        ) : (
          <div className="mt-6 text-sm text-white/70 tracking-wide">
            You’re on the list. Welcome.
          </div>
        )}

        <p className="text-[10px] uppercase tracking-widest text-gray-300 mt-10 opacity-70">
          We respect your privacy. No spam. Ever.
        </p>

      </div>
    </section>
  );
}