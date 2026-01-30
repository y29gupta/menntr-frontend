type Props = {
  difficulty: 'easy' | 'medium' | 'hard';
};

const styles = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
}
