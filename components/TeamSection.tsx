'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TeamConfig, TeamMember } from '@/lib/config';

interface TeamSectionProps {
  config?: TeamConfig;
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

export default function TeamSection({
  config,
  title = "Notre Équipe",
  subtitle = "Des professionnels passionnés à votre service",
  members = []
}: TeamSectionProps) {
  // Use config values if provided, otherwise fall back to props or defaults
  const teamMembers = config?.members || members;
  // Limit to maximum 4 members
  const displayedMembers = teamMembers.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className={`grid gap-8 ${
          displayedMembers.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
          displayedMembers.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
          displayedMembers.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {displayedMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Photo */}
              <motion.div
                className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Name */}
              <motion.h3
                className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                whileHover={{ color: "#ff7e5f" }}
                transition={{ duration: 0.2 }}
              >
                {member.name}
              </motion.h3>

              {/* Position */}
              <p className="text-orange-500 font-semibold text-lg mb-3">
                {member.position}
              </p>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
