import { useState, useEffect } from 'react';
import { type TeamMemberType } from '../../../../types/TeamMemberType';
import { TeamMembercard } from '../../../Molecules/TeamMemberCard/TeamMemberCard';

const teamMembersData: TeamMemberType[] = [
  {
    name: 'Mykhailo Savchenko',
    role: 'Lead Developer',
    shortDescription: '🧠 The Architect',
    longDescription:
      'The system-thinker who lays the groundwork and connects all the dots. Sees the bigger picture and builds with clarity.Ensures the project’s technical foundation is solid, consistent, and scalable. Brings structure where others bring ideas.',
    image:
      'https://media.licdn.com/dms/image/v2/D4E35AQGJASCBF7MrDQ/profile-framedphoto-shrink_800_800/B4EZfKcbv1GcAo-/0/1751448141136?e=1753041600&v=beta&t=0uzijPTN7a-xitGg76vBXId6ynLiCKFAXeStBQwy4Qo',
    linkedIn: 'https://www.linkedin.com/in/mykhailo-savchenko-0b7b62329/',
  },
  {
    name: 'Viktoriia Kucher',
    role: 'PM & Frontend Developer',
    shortDescription: '📋 The Strategist',
    longDescription:
      'The organizer who steers both process and progress. Builds with purpose and precision. Combines an eye for UI flow with a strong grasp of front-end logic. Contributes to both the structure and interactivity of the product, ensuring that features are not just functional — but feel intuitive.',
    image:
      'https://media.licdn.com/dms/image/v2/D4D35AQEks8033ooQEQ/profile-framedphoto-shrink_200_200/B4DZcf3VvkGcAY-/0/1748586290491?e=1753041600&v=beta&t=rc6Mc1WHBONH71CXQnkKankGycI3MLGqskXL0WgyoU0',
    linkedIn: 'https://www.linkedin.com/in/viktoriia-kucher/',
  },
  {
    name: 'Meriam Nazarenko',
    role: 'Frontend Developer',
    shortDescription: '🎨 The Stylist',
    longDescription:
      'The one who refines chaos into clarity. Transforms complexity into elegant patterns. Brings coherence to design, logic, and behavior. Knows how to find harmony between visuals and function. ',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQFwZHxFAwBmMA/profile-displayphoto-shrink_200_200/B4DZcSOb1pGkAY-/0/1748357463851?e=1758153600&v=beta&t=VL6bE1wqE9nfigs-XhQzTU-Jb6U3kea_Tlcbkx3geqU',
    linkedIn: 'https://www.linkedin.com/in/meriam-n-a6a5aa14b/',
  },
  {
    name: 'Yelyzaveta Zhyrova',
    role: 'Frontend Developer',
    shortDescription: '💡 The UX Engine',
    longDescription:
      'The detail-oriented mind shaping the interface experience. Designs with intent and attention to detail. Focuses on creating a seamless user experience that feels polished and intuitive. Values consistency and connection.',
    image:
      'https://media.licdn.com/dms/image/v2/D4D35AQHIMlStQUnLqw/profile-framedphoto-shrink_200_200/B4DZdwohCGHkAY-/0/1749941359007?e=1753041600&v=beta&t=rSS5WfVaePbzekwYSuJBd_mnujyMXxZHpGWpjoOl3HY',
    linkedIn: 'https://www.linkedin.com/in/yelyzaveta-zhyrova-69651b326/',
  },
  {
    name: 'Yaroslav Katsarskiy',
    role: 'Frontend Developer',
    shortDescription: '⚙️ The Mechanic',
    longDescription:
      'The hands-on maker behind the visual logic. Focused on the moving parts that power the interface. Efficiently brings together visuals, interaction, and data. Comfortable working close to the core of user-facing components, shaping dynamic pieces that drive user engagement.',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQF4w5ykVNpYpw/profile-displayphoto-shrink_200_200/B4DZcRytpHGcAY-/0/1748350197520?e=1758153600&v=beta&t=-tGZ3rkDcnrvloF-pmABoqWdIGUOTuAlffdmuDHP1Uk',
    linkedIn: 'https://www.linkedin.com/in/yaroslav-katsarskiy-280b182a4/',
  },
];

export const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const [displayedMembers, setDisplayedMembers] = useState<TeamMemberType[]>(
    [],
  );
  const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const leadDev = teamMembersData.find(
        (member) => member.role === 'Lead Developer',
      );
      const pm = teamMembersData.find(
        (member) => member.role === 'PM & Frontend Developer',
      );

      const otherMembers = teamMembersData.filter(
        (member) =>
          member.role !== 'Lead Developer' &&
          member.role !== 'PM & Frontend Developer',
      );

      const shuffledOthers = shuffleArray([...otherMembers]);

      const finalOrder = [];
      if (leadDev) finalOrder.push(leadDev);
      if (pm) finalOrder.push(pm);
      finalOrder.push(...shuffledOthers);

      setDisplayedMembers(finalOrder);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-primary font-sans px-4 sm:px-6 xl:px-0 xl:max-w-[1200px] mx-auto">
      <h1 className="text-5xl font-extrabold text-center mb-12 animate-fade-in-down">
        Meet Our Team
      </h1>

      {loading ?
        <div className="bg-[#20233d] shadow-xl rounded-lg p-8 mb-12 text-[#cdced2] animate-pulse">
          <div className="h-8 bg-[#3a3f5a] w-3/4 mb-6 rounded"></div>
          <div className="h-5 bg-[#3a3f5a] w-full mb-3 rounded"></div>
          <div className="h-5 bg-[#3a3f5a] w-5/6 mb-3 rounded"></div>
          <div className="h-5 bg-[#3a3f5a] w-11/12 mb-3 rounded"></div>
          <div className="h-5 bg-[#3a3f5a] w-full rounded"></div>
          <div className="h-5 bg-[#3a3f5a] w-4/5 mt-6 mb-3 rounded"></div>
          <div className="h-5 bg-[#3a3f5a] w-full rounded"></div>
        </div>
      : <div className="bg-card shadow-xl rounded-lg p-8 mb-12 text-primary">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-[#f1f2f9] pb-3">
            Behind Nice Gadgets
          </h2>
          <p className="text-lg leading-relaxed">
            We are a passionate team of five, united by our enthusiasm for
            technology and creating exceptional digital experiences. This
            gadgets store project is the result of our collaborative effort,
            combining diverse skills in development, design, and content
            creation to bring our vision to life.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            From crafting intuitive user interfaces to developing robust backend
            systems, each member plays a crucial role in shaping Nice Gadgets.
            Get to know the individuals who made this project possible!
          </p>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ?
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#20233d] shadow-xl rounded-lg p-6 flex flex-col items-center text-center animate-pulse"
            >
              <div className="w-36 h-36 rounded-full bg-[#3a3f5a] mb-6"></div>
              <div className="h-6 bg-[#3a3f5a] w-3/4 mb-2 rounded"></div>
              <div className="h-5 bg-[#3a3f5a] w-1/2 mb-4 rounded"></div>
              <div className="h-4 bg-[#3a3f5a] w-full mb-2 rounded"></div>
              <div className="h-4 bg-[#3a3f5a] w-5/6 rounded"></div>
            </div>
          ))
        : displayedMembers.map((member, index) => (
            <TeamMembercard
              key={index}
              member={member}
              index={index}
            />
          ))
        }
      </div>
    </div>
  );
};
