interface ShareProps {
  address: string;
  percentage: string;
}

function Share({ address, percentage }: ShareProps) {
  return (
    <div className="flex justify-between px-1">
      <p className={`text-[13px]`}>{address}</p>
      <p className={`text-[13px]`}>{percentage}%</p>
    </div>
  );
}

export default Share;
