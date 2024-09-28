import { cn } from "@/lib/utils";

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidthSmall= 2,
  borderWidthBig= 2.5,
  colorFromDark = "#ffaa40",
  colorToDark = "#9c40ff",
  colorFrom  = "#ffaa40",
  colorTo ="#9c40ff",
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width-big": borderWidthBig,
          "--border-width-small": borderWidthSmall,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--color-from-dark":colorFromDark,
          "--color-to-dark":colorToDark,
          "--delay": `-${delay}s`,
        }
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] dark:[border:calc(var(--border-width-small)*1px)_solid_transparent] [border:calc(var(--border-width-big)*1px)_solid_transparent]",
 
        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
 
        // pseudo styles
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] dark:after:[background:linear-gradient(to_left,var(--color-from-dark),var(--color-to-dark),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
};
