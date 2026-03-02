/**
 * @name PromiseCard
 * @description A high-end value proposition card used to communicate brand "promises" (e.g., Sustainability, Craftsmanship).
 * Designed with a glassmorphism aesthetic to overlay elegantly on dark or image-heavy sections.
 * * @features
 * - **Visual Rebranding**: Uses `brightness-0 invert` filters to dynamically transform standard color icons into minimalist white silhouettes.
 * - **Glassmorphism**: Combines `bg-white/5` with `backdrop-blur-sm` to create a translucent, high-end material effect.
 * - **Hover Feedback**: Triggers a multi-property transition including a vertical lift (`-translate-y-2`) and an accent line reveal.
 * * @styling
 * - **Composition**: Centralizes all elements within a `flex-col items-center` stack to maintain symmetry.
 * - **Accent Detailing**: Features an absolute-positioned top border that fades in via the `group-hover` state for subtle sophistication.
 * - **Typography**: Pairs a medium-weight title with `leading-relaxed` gray body text to ensure readability within a compact container.
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
