interface ShareProps {
  address: string;
  percentage: string;
}

function Share({ address, percentage }: ShareProps) {
  return (
    <div className="flex justify-between px-4 mt-4">
      <p className={`text-[13px] truncate w-[220px]`}>{address}</p>
      <p className={`text-[13px]`}>{percentage}%</p>
    </div>
  );
}

export default Share;
