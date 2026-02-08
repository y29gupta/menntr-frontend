import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-full ">{children}</div>;
};

export default layout;
