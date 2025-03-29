import Image from 'next/image'
import styles from './styles.module.css'

export const Issue = ({ issue }: { issue: any }) => {
  function increaseContrast(hex: string, saturationFactor: number = 2.5, lightnessFactor: number = 0.8): string {
    let red = parseInt(hex.substring(0, 2), 16) / 255, green = parseInt(hex.substring(2, 4), 16) / 255, blue = parseInt(hex.substring(4, 6), 16) / 255;
    let maxColor = Math.max(red, green, blue), minColor = Math.min(red, green, blue);
    let hue = 0, saturation = 0, lightness = (maxColor + minColor) / 2;

    if (maxColor !== minColor) {
      let colorDifference = maxColor - minColor;
      saturation = lightness > 0.5 ? colorDifference / (2 - maxColor - minColor) : colorDifference / (maxColor + minColor);

      switch (maxColor) {
        case red:
          hue = ((green - blue) / colorDifference + (green < blue ? 6 : 0));
          break;
        case green:
          hue = ((blue - red) / colorDifference + 2);
          break;
        case blue:
          hue = ((red - green) / colorDifference + 4);
          break;
      }

      hue /= 6;
    }

    saturation = Math.min(1, Math.max(0, saturation * saturationFactor));
    lightness = Math.min(1, Math.max(0, lightness * lightnessFactor));

    const calculateRGBFromHSL = (lightnessAdjustment: number, saturationAdjustment: number, hueFraction: number) => {
      if (hueFraction < 0)
        hueFraction += 1;

      if (hueFraction > 1)
        hueFraction -= 1;

      if (hueFraction < 1 / 6)
        return lightnessAdjustment + (saturationAdjustment - lightnessAdjustment) * 6 * hueFraction;

      if (hueFraction < 1 / 2)
        return saturationAdjustment;

      if (hueFraction < 2 / 3)
        return lightnessAdjustment + (saturationAdjustment - lightnessAdjustment) * (2 / 3 - hueFraction) * 6;

      return lightnessAdjustment;
    };

    let saturationAdjustment = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    let lightnessAdjustment = 2 * lightness - saturationAdjustment;

    red = calculateRGBFromHSL(lightnessAdjustment, saturationAdjustment, hue + 1 / 3);
    green = calculateRGBFromHSL(lightnessAdjustment, saturationAdjustment, hue);
    blue = calculateRGBFromHSL(lightnessAdjustment, saturationAdjustment, hue - 1 / 3);

    return `#${Math.round(red * 255).toString(16).padStart(2, "0")}${Math.round(green * 255).toString(16).padStart(2, "0")}${Math.round(blue * 255).toString(16).padStart(2, "0")}`;
  }

  return (
    <li className={styles.issueItem}>
      <div>
        <Image src={issue.user.avatar_url} width={50} height={50} alt={issue.user.login} />
        <p>{issue.user.login}</p>
      </div>

      <section className={styles.issueInfo}>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
        <article className={styles.content}>
          {issue.labels.map((label: any) => (
            <span key={String(label.id)} className={styles.label} style={{ backgroundColor: increaseContrast(label.color) }}>
              {label.name}
            </span>
          ))}
        </article>
      </section>
    </li>
  )
}