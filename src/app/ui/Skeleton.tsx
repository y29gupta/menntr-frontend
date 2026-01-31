type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
};

export default Skeleton;
