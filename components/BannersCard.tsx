import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";

interface BannersCardProps {
  icon?: IconDefinition; 
  title: string;
  content: string;
  onClick?: () => void; 
}

const BannersCard: React.FC<BannersCardProps> = ({ icon, title, content,onClick }) => {
  return (
    <motion.div
      className="shadow-lg rounded-lg flex flex-col items-center justify-center mt-10 w-1/4 min-w-[320px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick}
    >
      <div className="bg-red-gradient w-full flex flex-col items-center justify-center text-white p-3 rounded-t-lg">
        {icon ? (
          <FontAwesomeIcon icon={icon} size="2x" />
        ) : (
          <span className="text-red-500">No Icon</span>
        )}
        <h3 className="text-lg font-bold text-center mt-2">{title}</h3>
      </div>
      <div className="bg-white text-center p-4" dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </motion.div>
  );
};

export default BannersCard;
