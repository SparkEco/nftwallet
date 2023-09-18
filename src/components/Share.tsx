interface ShareProps {
  address: string;
  percentage: string;
}

function Share({ address, percentage }: ShareProps) {
  return (
    <div className="flex justify-between lg:text-[15px] text-[13px] px-0 lg:px-1">
      <p className={`text-[13px]`}>{address}</p>
      <p className={`text-[13px]`}>{percentage}%</p>
    </div>
  );
}

export default Share;
