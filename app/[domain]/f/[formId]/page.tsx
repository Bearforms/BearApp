import { notFound } from 'next/navigation';

const page = ({ params }: any) => {
  // return notFound();
  return (
    <div>page sfgsgf { JSON.stringify(params, null, 2)}</div>
  );
};

export default page;