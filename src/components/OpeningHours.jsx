import React from 'react';
import { motion } from 'framer-motion';

const openingHoursData = [
  { days: 'Mon–Fri', hours: '9 AM – 9 PM' },
  { days: 'Sat–Sun', hours: '10 AM – 9 PM' },
];

const OpeningHours = () => {
  return (
    <motion.div 
      className="text-amber-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-bold mb-2">Opening Hours</h3>
      <ul>
        {openingHoursData.map((item, index) => (
          <motion.li 
            key={index} 
            className="flex justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <span>{item.days}:</span>
            <span>{item.hours}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default OpeningHours;