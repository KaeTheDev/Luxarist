/**
 * @name PromiseCard
 * @description A reusable card component that displays a single brand promise or value.
 *  Includes an icon, a title, and descriptive text with subtle hover effects to enhance interactivity.
 * 
 * @composition
 * - Accepts props `iconUrl`, `title`, and `text` to render dynamic content.
 * - Uses flexbox and centered text to maintain visual alignment.
 * - Includes a top accent line and hover transformations for interactive feedback.
 * 
 * @styling
 * - **Layout**: Vertical stacking with padding, rounded corners, and backdrop blur.
 * - **Typography**: Medium-weight titles with tracking and smaller descriptive text.
 * - **Interaction**: Hover effects include border highlight, slight upward movement, shadow, and accent line reveal.
 * - **Colors**: Light-on-dark contrast with semi-transparent backgrounds for a premium aesthetic.
 * 
 * @responsibilities
 * - Visually communicate a single brand promise or key value.
 * - Maintain consistency with other cards in a grid or section.
 * - Respond to user interaction with subtle animations.
 * 
 * @usage
 * - Used within sections like `BrandPromiseSection` to render multiple promise cards.
 * - Example:
 *      <PromiseCard iconUrl="/path/to/icon.svg" title="Lifetime Guarantee" text="We stand behind our craftsmanship..." />
 */

interface PromiseCardProps {
  iconUrl: string;
  title: string;
  text: string;
}

export function PromiseCard({ iconUrl, title, text }: PromiseCardProps) {
  return (
    <div
      className="group relative flex flex-col items-center text-center p-8
        bg-white/5 backdrop-blur-sm 
        border border-white/10
        rounded-2xl
        transition-transform transition-border duration-500
        hover:border-white/20 hover:-translate-y-2 hover:shadow-lg"
    >
      {/* Subtle Top Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon */}
      <div className="w-20 h-20 mb-6 flex items-center justify-center">
        <div className="w-full h-full filter brightness-0 invert">
          <img
            src={iconUrl}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-medium tracking-wide mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}
