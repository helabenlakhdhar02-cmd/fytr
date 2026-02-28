import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import FreelancerMessageModal from './FreelancerMessageModal';

// Add this state inside your component
const [showMessageModal, setShowMessageModal] = useState(false);

// Add this button to the project card actions
{userRole === 'freelancer' && (
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowMessageModal(true);
    }}
    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    title="Message Client"
  >
    <FaEnvelope size={16} />
  </button>
)}

// Add this at the end of your component, before the return closing tag
{showMessageModal && (
  <FreelancerMessageModal
    isOpen={showMessageModal}
    onClose={() => setShowMessageModal(false)}
    clientId={project.client?.id}
    clientName={project.client?.name || 'Client'}
    projectId={project.id}
    projectTitle={project.title || 'Project'}
  />
)}
