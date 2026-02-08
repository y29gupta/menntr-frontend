'use client';
import LogoutIcon from '../components/icons/LogoutIcon';

// const Logout = ({ onClick }: { onClick: () => void }) => {
const Logout = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-red-600 font-medium rounded-md border border-red-300 hover:bg-red-50 transition-colors flex items-center gap-2 text-sm"
    >
      <LogoutIcon color="#F44336" />
      Log out
    </button>
  );
};

export default Logout;
