import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={56} reverse speed={50}>
        {logos.map((logo) => {
          const needsLarger = ["Puravankara", "JW Marriott", "Nethradhama"].includes(logo.alt);
          return (
            <img
              alt={logo.alt}
              className={cn(
                "pointer-events-none w-auto select-none object-contain",
                needsLarger
                  ? "h-12 md:h-16 max-w-[160px] md:max-w-[200px]"
                  : "h-8 md:h-10 max-w-[120px] md:max-w-[140px]"
              )}
              key={`logo-${logo.alt}`}
              loading="lazy"
              src={logo.src}
            />
          );
        })}
      </InfiniteSlider>
    </div>
  );
}
