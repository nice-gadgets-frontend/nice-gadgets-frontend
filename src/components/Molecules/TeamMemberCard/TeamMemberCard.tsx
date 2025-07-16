import { useState } from 'react';
import type { TeamMemberType } from '../../../types/TeamMemberType';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

type TeamMemberCardProps = {
  member: TeamMemberType;
  index: number;
};

export const TeamMembercard = ({ member, index }: TeamMemberCardProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div>
      <div
        key={member.name}
        className="relative w-full h-90"
        style={{ perspective: '1000px' }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transition: 'transform 0.7s',
            transformStyle: 'preserve-3d',
            transform: hoveredCard === index ? 'rotateY(180deg)' : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
            }}
            className="bg-card shadow-xl rounded-lg p-6 flex flex-col items-center text-center min-w-[285px]"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-[#4CAF50]"
            />
            <h3 className="text-2xl font-bold mb-2 text-primary">
              {member.name}
            </h3>
            <p className="text-lg font-medium text-primary mb-2">
              {member.role}
            </p>
            <p className="text-primary leading-relaxed italic">
              {member.shortDescription}
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="bg-card shadow-xl rounded-lg p-6 flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-2xl font-bold mb-2 text-primary">
              {member.name}
            </h3>
            <p className="text-lg font-medium text-primary mb-4">
              {member.role}
            </p>
            <p className="text-primary leading-relaxed text-sm overflow-auto max-h-40 no-scrollbar mb-4">
              {member.longDescription}
            </p>
            <Link
              to={member.linkedIn}
              target="__blank"
              className="text-[#f1f2f9] p-2 rounded-2xl bg-blue-500 place-self-end"
            >
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
