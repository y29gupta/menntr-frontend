type InfoCardProps = {
  title: string;
  value: string;
};

export function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-[#EAECF0] p-4 flex items-start gap-3">
      <div>
        <p className="text-sm font-medium text-[#101828]">{title}</p>
        <p className="text-sm text-[#667085]">{value}</p>
      </div>
    </div>
  );
}
