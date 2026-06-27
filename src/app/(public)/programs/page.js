import ProgramsClient from './ProgramsClient';

export const metadata = {
  title: "English Programs | EL's Corner",
  description: "Browse Kids English, Teens English, and General English programs at EL's Corner.",
};

export default async function Programs() {
  return <ProgramsClient />;
}
