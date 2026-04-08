import styles from './calendar.module.css';

// Using stable IDs from picsum.photos that feature landscapes and nature
const natureImageIds = [
  10,   // Forest
  11,   // Landscape
  16,   // Sea
  28,   // Nature
  29,   // Mountains
  1015, // River valley
  1018, // Mountains
  1019, // Coastline
  1036, // Winter landscape
  1043, // Beautiful nature
  1044, // Scenic
  1050  // Scenic
];

export default function HeroImage({ monthIndex }: { monthIndex: number }) {
  // Rotate through the nature images based on the month
  const picsumId = natureImageIds[monthIndex % natureImageIds.length];
  const imageUrl = `https://picsum.photos/id/${picsumId}/800/1000`;

  return (
    <div className={styles.heroImageContainer}>
      <img src={imageUrl} alt={`Calendar Month ${monthIndex + 1} Illustration`} className={styles.heroImage} />
    </div>
  );
}
