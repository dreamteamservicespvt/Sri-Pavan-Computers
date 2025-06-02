import { useState, useEffect } from 'react';
import { getTeamMembers, TeamMember } from '@/services/teamMemberService';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

// Animation variants for staggered animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      setIsLoading(true);
      try {
        console.log("TeamSection: Loading team members...");
        const members = await getTeamMembers();
        console.log("TeamSection: Loaded team members:", members);
        setTeamMembers(members);
      } catch (error) {
        console.error("Error loading team members:", error);
        setError("Failed to load team members");
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  // Show error state if needed
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Meet Our Leadership Team" 
            subtitle="The experts behind Sri Pavan Computers" 
            center={true}
          />
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Animation variants for staggered animations
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Meet Our Leadership Team" 
            subtitle="The experts behind Sri Pavan Computers" 
            center={true}
          />
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Meet Our Leadership Team" 
          subtitle="The experts behind Sri Pavan Computers" 
          center={true}
        />
        
        {teamMembers.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Our team information is coming soon.</p>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Enhanced team member card component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      variants={item}
    >
      {/* Improved image container with better aspect ratio */}
      <div className="relative h-0 pb-[75%] overflow-hidden bg-gray-100">
        {/* Image with object-position to focus on face */}
        <img 
          src={member.image} 
          alt={member.name} 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: 'center 15%' }} // Better face positioning
          loading="lazy"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=400`;
          }}
        />
        
        {/* Elegant overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Social icons overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end opacity-0 hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2">
            {member.socialLinks?.linkedin && (
              <a 
                href={member.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-primary hover:text-white transition-all"
                aria-label={`LinkedIn profile of ${member.name}`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {member.socialLinks?.twitter && (
              <a 
                href={member.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-primary hover:text-white transition-all"
                aria-label={`Twitter profile of ${member.name}`}
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {member.socialLinks?.email && (
              <a 
                href={`mailto:${member.socialLinks.email}`}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-primary hover:text-white transition-all"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Card content with improved typography */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-primary font-medium text-sm mb-3">{member.position}</p>
        
        {/* Divider for visual separation */}
        <div className="w-10 h-1 bg-primary/20 rounded mb-4"></div>
        
        {/* Bio with controlled height */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{member.bio}</p>
        
        {/* Extra accent for visual appeal */}
        <div className="mt-auto pt-4">
          <div className="w-full h-1 bg-gradient-to-r from-primary to-primary/5 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamSection;
